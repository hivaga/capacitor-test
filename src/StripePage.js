import React, {useState} from 'react';
import {Stripe as StripeClient, ApplePayEventsEnum} from '@capacitor-community/stripe';
import Stripe from 'stripe';
import {Capacitor} from "@capacitor/core";

const stripeServer = new Stripe('sk_test_51NXNpOAwRn7VJAdT9EfWlx9er0MVUwW13sjiGGVENcMUuSL9XW4dWKeXLB6PqTmiAT26uH7Ur47e20NAmlFc69ch00iUgSKcr1');

// Initialize the Stripe plugin
if (Capacitor.isPluginAvailable("Stripe")) {
    StripeClient.initialize({
        publishableKey: 'pk_test_51NXNpOAwRn7VJAdTnUJ9odIXZBJnxSCjzregYvuZKiFMo3Y1zGTfQceJkUsvwBJi99kVywGIFSGyCgykVttUwt4W004jfNdhHH',
    })
}

function createPaymentIntent(amount, currency) {

    return stripeServer.paymentIntents.create({
        amount,
        currency,
        // You can also add additional parameters here, such as a customer ID or payment method ID
        metadata: {integration_check: 'accept_a_payment'},
    })
}


export default function StripePage() {
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        setLoading(true);

        try {
            try {
                const paymentIntent = await createPaymentIntent(1000, "usd");
                console.log("PaymentIntent client secret:", paymentIntent.client_secret);

                await StripeClient.createPaymentSheet({
                    paymentIntentClientSecret: paymentIntent.client_secret,
                    merchantDisplayName: "Inclusive Innovation Incubator",
                });

                const {paymentResult} = await StripeClient.presentPaymentSheet();
                console.log(paymentResult);
            } catch (e) {
                console.error("StripeClient.createPaymentIntent() or StripeClient.createPaymentSheet(...) Error", e);
            }


        } catch (error) {
            console.error("Payment failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleApplePay = async () => {
        // Check to be able to use Apple Pay on device
        const isAvailable = StripeClient.isApplePayAvailable().catch(() => undefined);
        if (isAvailable === undefined) {
            // disable to use Google Pay
            console.log('Apple Pay is not available');
            return;
        }

        // be able to get event of Apple Pay
        StripeClient.addListener(ApplePayEventsEnum.Completed, () => {
            console.log('ApplePayEventsEnum.Completed');
        });

        // Connect to your backend endpoint, and get paymentIntent.
        const paymentIntent = await createPaymentIntent(1000, "usd");
        console.log("PaymentIntent client secret:", paymentIntent.client_secret);


        try{
            // Prepare Apple Pay
            await StripeClient.createApplePay({
                paymentIntentClientSecret: paymentIntent.client_secret,
                paymentSummaryItems: [{
                    label: 'Product Name',
                    amount: 1099.00
                }],
                merchantDisplayName: 'rdlabo',
                countryCode: 'US',
                currency: 'USD',
            });

            console.log('StripeClient.createApplePay(...) OK');

            // Present Apple Pay
            const result = await StripeClient.presentApplePay();
            if (result.paymentResult === ApplePayEventsEnum.Completed) {
                // Happy path
            }
        }catch (e) {
           console.error('Apple Pay context Error', e);
        }
    };

    return (
        <div>
            <h1>Apple Pay</h1>
            <button onClick={handleApplePay} disabled={loading}>
                {loading ? "Loading..." : "Checkout - Payment Sheet"}
            </button>
        </div>
    );

}