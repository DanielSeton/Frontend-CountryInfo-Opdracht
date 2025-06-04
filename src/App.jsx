import './App.css';
import axios from "axios";
import {useState} from "react";
import worldMap from './assets/world_map.png';
import {setColor} from "./helpers/setColor.js";
import {formatPopulation} from "./helpers/formatPopulation.js";

function App() {

    const[countries, setCountries] = useState("");
    const[searchCountry, setSearchCountry] = useState("");
    const[countryInfo, setCountryInfo] = useState({});
    const[error, setError] = useState("");

    async function getCountries(){
        try {
            const result = await axios.get('https://restcountries.com/v3.1/all');
            console.log(result);

            result.data.sort((a, b) => {
                return a.population - b.population;
            });

            setCountries(result.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleSubmit(e){
        e.preventDefault();
        setError("");

        try {
            const query = await axios.get(`https://restcountries.com/v3.1/name/${searchCountry}`);

            console.log(query.data[0]);
            const country = query.data[0];
            setCountryInfo(country);
            setSearchCountry('');
        } catch (error) {
            console.error(error);
            setError(`${searchCountry} doesn't exist, please try again.`);
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
                <section className="search-container">
                    <h2>Search country information</h2>
                    <form className="search-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="query"
                            id="query-field"
                            placeholder="Vul iets in"
                            value={searchCountry}
                            onChange={(e) => setSearchCountry(e.target.value)}>
                        </input>
                        <button type="Submit">Search</button>
                        <hr/>
                        {error && <span className="error-message">{error}</span>}
                    </form>
                    {Object.keys(countryInfo).length > 0 &&
                        <article className="search-result-box">
                            <span className="flag-title-container">
                                <img src={countryInfo.flags.svg} alt={`Vlag van ${countryInfo.name.common}`} className="search-flag"/>
                                <h2>
                                    {countryInfo.name.common}
                                </h2>
                            </span>
                            <p>
                                {countryInfo.name.common} is situated in {countryInfo.subregion} and the capital is {countryInfo.capital[0]}.
                            </p>
                            <p>
                                It has a population of {formatPopulation(countryInfo.population)} people and it borders with {countryInfo.borders.length} neighboring countries.
                            </p>
                            <p>
                                Websites can be found on <code>{countryInfo.tld[0]}</code> domain's.
                            </p>
                        </article>
                    }
                </section>
            </main>
        </>
    )
}

export default App
