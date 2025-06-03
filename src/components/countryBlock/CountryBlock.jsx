import './CountryBlock.css'

function CountryBlock(name, population) {
    return (
        <div>
            <p>{name}</p>
            <p>Has a population of {population}</p>
        </div>
    )
}

export default CountryBlock