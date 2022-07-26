import axios from 'axios'

const getAllCountries = () => {
    return axios.get("https://restcountries.com/v3.1/all")
}

//message: "Invalid API key. Please see http://openweathermap.org/faq#error401 for more info."
const getWeather = (lat, lon) => {
    return axios.get("https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,daily,alerts&appid=5e5740401494f6ab2ba435f9a624ebea")
}

export {
    getAllCountries,
    getWeather
}