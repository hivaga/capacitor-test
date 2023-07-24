import './App.css';
import GeolocationPage from "./GeolocationPage";
import StripePage from "./StripePage";

function App() {
    return (
        <div className="App">
            <h1>Capacitor App</h1>
            <GeolocationPage/>
            <StripePage/>
        </div>
    );
}

export default App;
