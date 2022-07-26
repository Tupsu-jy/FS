import { getWeather } from "../services/connection"
import { useState } from "react"

const Detailed = ({ country }) => {


    const [weather, setWeather] = useState([])
    getWeather(country.latlng[0], country.latlng[1]).then(response => { setWeather(response.data) })

    let weatherInfo = null

    if (weather != null) {

    }


    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h2>Languages:</h2>
            {Object.values(country.languages).map((lan) => <li>{lan}</li>)}
            <img src={country.flags.png} alt="flag"></img>
        </div>
    )
}

export default Detailed