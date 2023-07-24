import React, {useState, useCallback} from 'react';
import { Geolocation } from '@capacitor/geolocation';

export default function GeolocationPage() {

    const [loc, setLoc] = useState(null);

    const getCurrentPosition = useCallback(async () => {
        console.log("Geolocation.getCurrentPosition() called");
        try{
            const coordinates = await Geolocation.getCurrentPosition();
            setLoc(coordinates);
        }catch (e){
            console.error("Geolocation.getCurrentPosition() Error",e);
        }

    }, []);

    return (
        <div>
            <h1>Geolocation</h1>
            <p>Your location is:</p>
            <p>Latitude: {loc?.coords.latitude}</p>
            <p>Longitude: {loc?.coords.longitude}</p>

            <button onClick={getCurrentPosition}>
                Get Current Location
            </button>
        </div>
    );
}