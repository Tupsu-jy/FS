import { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import SetBirthYear from "./components/SetBirthYear";
import Login from "./components/Login";
import Recommended from "./components/Recommended";

const App = () => {
  const [page, setPage] = useState("authors");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const client = useApolloClient();

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    if (storedToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setIsLoggedIn(false);
    setPage("login");
    client.resetStore()
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {isLoggedIn ? (
          <>
            <button onClick={() => setPage("recommended")}>recommended</button>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={handleLogout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors show={page === "authors"} />

      {isLoggedIn && <SetBirthYear show={page === "authors"} />}

      <Books show={page === "books"} />

      {isLoggedIn && <Recommended show={page === "recommended"} />}

      {isLoggedIn && <NewBook show={page === "add"} />}

      {!isLoggedIn && (
        <Login show={page === "login"} setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
};

export default App;
