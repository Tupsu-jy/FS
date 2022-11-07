import axios from 'axios'

const getAllCountries = () => {
    return axios.get("https://restcountries.com/v3.1/all")
}

const getWeather = (cap) => {
    return axios.get("https://api.openweathermap.org/data/2.5/weather?q=" + cap + "&appid=" + process.env.REACT_APP_WEATHERAPIKEY + "&units=metric")
}

export {
    getAllCountries,
    getWeather
}