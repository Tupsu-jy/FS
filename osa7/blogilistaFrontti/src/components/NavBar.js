import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom"; // import Link component

function NavBar({ handleLogout }) {
  const { user } = useContext(UserContext);

  return (
    <nav>
      <Link to="/">Blogs</Link>
      <Link to="/users">Users</Link>
      <p>
        {user.name} logged in{" "}
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </p>
    </nav>
  );
}

export default NavBar;
