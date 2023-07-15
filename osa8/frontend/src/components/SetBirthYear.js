import React, { useState } from "react";
import { useAllAuthors, useSetAuthorBirthYear } from "../connection/hooks";

const SetBirthYear = (props) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  const { setBirthYear, result } = useSetAuthorBirthYear();
  const { authors, loading, error } = useAllAuthors();

  if (!props.show || loading) {
    return null;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const submit = async (event) => {
    event.preventDefault();

    setBirthYear({ name, born });

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
      {result.error && <p>{result.error.message}</p>}
    </div>
  );
};

export default SetBirthYear;
