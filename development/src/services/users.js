import axios from 'axios'
const baseUrl = '/api/users'

const signup = async (username, name, password) => {
  try {
    const response = await axios.post(baseUrl, {
      username,
      name,
      password,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export { signup }