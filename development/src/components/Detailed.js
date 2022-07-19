const Detailed = ({ country }) => {

    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h2>Languages:</h2>
            {Object.values(country.languages).map((lan) => <li>{lan}</li>)}
            <img src={country.flags.png}></img>
        </div>
    )
}

export default Detailed