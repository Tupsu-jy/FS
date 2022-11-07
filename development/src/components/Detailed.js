import { getWeather } from "../services/connection"
import { useState } from "react"

const Detailed = ({ country }) => {


    const [weather, setWeather] = useState([])
    getWeather(country.capital).then(response => { setWeather(response.data) })

    let weatherInfo = null

    if (weather.length != 0) {
        let imgsrc = "https://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png"
        weatherInfo =
            <div>
                <h2>Weather in {country.capital}</h2>
                <p>temperature {weather.main.temp} celsius</p>
                <img src={imgsrc}></img>
                <p>wind speed {weather.wind.speed} m/s</p>
            </div>
    }


    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h2>Languages:</h2>
            {Object.values(country.languages).map((lan) => <li>{lan}</li>)}
            <img src={country.flags.png} alt="flag"></img>
            {weatherInfo}

        </div>
    )
}

export default Detailed