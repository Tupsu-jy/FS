import axios from 'axios';

const baseUrl = '/api/login';

const login = async (username, password) => {
  try {
    const response = await axios.post(baseUrl, {
      username,
      password,
    });

    localStorage.setItem('token', response.data.token);
    localStorage.setItem('username', response.data.username);
    localStorage.setItem('name', response.data.name);
    return response;
  } catch (error) {
    return error.response;
  }
};

export default login;
