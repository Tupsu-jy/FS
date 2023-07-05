import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import login from "../services/login";
import { UserContext } from "../contexts/UserContext";

function Login({ showNotification }) {
  const { dispatch } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await login(username, password);
    setUsername("");
    setPassword("");

    if (response.status >= 200 && response.status < 300) {
      dispatch({
        type: "LOGIN",
        payload: {
          token: response.data.token,
          username: response.data.username,
          name: response.data.name,
        },
      });
      showNotification("Login successful", true);
    } else {
      showNotification("Error logging in", false);
    }
  };

  return (
    <div id="login-component">
      <h2>Login Form</h2>
      <form id="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            id="login-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
};

export default Login;
