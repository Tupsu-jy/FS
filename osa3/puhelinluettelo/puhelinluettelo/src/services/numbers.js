import axios from 'axios'
const baseUrl = 'https://puhbac.fly.dev/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
    return axios.post(baseUrl, newObject)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export {
    getAll,
    create,
    update,
    remove
}