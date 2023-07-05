import React, { createContext, useReducer, useMemo } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext();

const initialUserState = {
  token: localStorage.getItem("token"),
  username: localStorage.getItem("username"),
  name: localStorage.getItem("name"),
};

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      const { token, username, name } = action.payload;
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("name", name);
      return { token, username, name };
    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("name");
      return { token: null, username: null, name: null };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export function UserProvider({ children }) {
  const [user, dispatch] = useReducer(userReducer, initialUserState);

  const contextValue = useMemo(() => ({ user, dispatch }), [user, dispatch]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
