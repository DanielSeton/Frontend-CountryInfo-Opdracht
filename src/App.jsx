import './App.css';
import axios from "axios";
import {useState} from "react";
import worldMap from './assets/world_map.png';
import CountryBlock from "./components/countryBlock/CountryBlock.jsx";
import {setColor} from "./helpers/setColor.js";

function App() {

    const[countries, setCountries] = useState("");
    const [countryAmount, setCountryAmount] = useState("");
    const [countryRegion, setCountryRegion] = useState("");

    async function getCountries(){
        try {
            const result = await axios.get('https://restcountries.com/v3.1/all');
            console.log(result);

            result.data.sort((a, b) => {
                return a.population - b.population;
            });

            setCountries(result.data);
            setCountryAmount(result.data[0].population);
            setCountryRegion(result.data[0].region);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <header>
                <img src={worldMap} alt="World map" className="worldMap"/>
            </header>
            <main>
                <section className="content">
                    <h1>World Regions</h1>
                    {countries.length > 0
                        ? <ul className="country-list">
                            {countries.map((country) => {
                                return (
                                    <li key={country.name.common}>
                                        <img src={country.flags.svg} alt={`Vlag van ${country.name.common}`} className="flag"/>
                                        <span className={setColor(country.region)}>{country.name.common}</span>
                                        <p className="population">Has a population of {country.population} people</p>
                                    </li>
                                )
                            })}
                        </ul> : <button className="country-button" onClick={getCountries}>Klik mij!</button>
                    }
                </section>
            </main>
        </>
    )
}

export default App
