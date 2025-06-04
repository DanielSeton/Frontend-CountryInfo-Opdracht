import './App.css';
import axios from "axios";
import {useState} from "react";
import worldMap from './assets/world_map.png';
import {setColor} from "./helpers/setColor.js";
import {formatPopulation} from "./helpers/formatPopulation.js";

function App() {

    const[countries, setCountries] = useState("");
    const[searchCountry, setSearchCountry] = useState('');

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

        try {
            const query = await axios.get('https://restcountries.com/v3.1/name/netherlands')
            console.log(query.data[0]);
            setSearchCountry(query.data[0]);
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
                <section className="search-container">
                    <h2>Search country information</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Vul iets in"
                            value={searchCountry}
                            onChange={(e) => setSearchCountry(e.target.value)}>
                        </input>
                        <button type="Submit">Search</button>
                    </form>
                    {/*{Object.keys(searchCountry).length > 0 &&*/}
                    {/*    <article className="country-list">*/}
                    {/*        <span>*/}
                    {/*            <img src={searchCountry.flags.svg} alt={`Vlag van ${searchCountry.name.common}`} className="flag"/>*/}
                    {/*            <h2>*/}
                    {/*                {searchCountry.name.common}*/}
                    {/*            </h2>*/}
                    {/*        </span>*/}
                    {/*        <p>*/}
                    {/*            {searchCountry.name.common} is situated in {searchCountry.subregion} and the capital is [searchCountry.capital[0]]*/}
                    {/*            It has a population of {formatPopulation(searchCountry.population)} million people and it borders with {searchCountry.borders.length} neighboring countries*/}
                    {/*            Websites can be found on <code>{searchCountry.tld[0]}</code> domain's*/}
                    {/*        </p>*/}
                    {/*    </article>*/}
                    {/*}*/}
                </section>
            </main>
        </>
    )
}

export default App
