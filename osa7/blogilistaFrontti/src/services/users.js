import axios from "axios";

const baseUrl = "/api/users";

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
};

// Add this function to get all users
const getAllUsers = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default { signup, getAllUsers };
