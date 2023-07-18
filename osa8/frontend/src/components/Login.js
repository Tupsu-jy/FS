import React, { useState } from "react";
import { useLogin } from "../connection/hooks";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { executeLogin } = useLogin();

  if (!props.show) {
    return null;
  }

  const handleLogin = (event) => {
    event.preventDefault();
    executeLogin({ username, password });
    props.setIsLoggedIn(true);
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
