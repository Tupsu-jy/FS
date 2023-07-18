import { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import SetBirthYear from "./components/SetBirthYear";
import Login from "./components/Login";

const App = () => {
  const [page, setPage] = useState("authors");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {isLoggedIn ? (
          <>
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

      {isLoggedIn && <NewBook show={page === "add"} />}

      {!isLoggedIn && (
        <Login show={page === "login"} setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
};

export default App;
