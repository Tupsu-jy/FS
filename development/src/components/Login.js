import React, { useState } from 'react';
import { login } from '../services/login.js';

const Login = ({ handleLogin, showNotification }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await login(username, password);
    setUsername('');
    setPassword('');
    handleLogin();
    if (response.status >= 200 && response.status < 300) {
      showNotification('Login successful', true);
    } else {
      showNotification('Error logging in', false);
    }

  };

  return (
    <div>
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
