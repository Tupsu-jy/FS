import React, { useState } from "react";
import PropTypes from "prop-types";
import signup from "../services/users";

function Signup({ showNotification }) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await signup(username, name, password);
    setUsername("");
    setName("");
    setPassword("");
    if (response.status >= 200 && response.status < 300) {
      showNotification("Signup successful", true);
    } else {
      showNotification("Error signing up", false);
    }
  };

  return (
    <div>
      <h2>Signup Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label htmlFor="name">
          Name:
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

Signup.propTypes = {
  showNotification: PropTypes.func.isRequired,
};

export default Signup;
