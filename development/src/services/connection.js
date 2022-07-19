import axios from 'axios'

const getAllCountries = () => {
    return axios.get("https://restcountries.com/v3.1/all")
}

export {
    getAllCountries
}