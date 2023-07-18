import React, { useState } from "react";
import { useAllBooks } from "../connection/hooks";

const Books = (props) => {
  const { books, loading, error } = useAllBooks();
  const [selectedGenre, setSelectedGenre] = useState("all genres");

  if (!props.show) {
    return null;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  const genres = [...new Set(books.flatMap((book) => book.genres))];

  const filteredBooks =
    selectedGenre !== "all genres"
      ? books.filter((book) => book.genres.includes(selectedGenre))
      : books;

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>Genres</h3>
        <button onClick={() => setSelectedGenre("all genres")}>
          all genres
        </button>
        {genres.map((genre, index) => (
          <button key={index} onClick={() => setSelectedGenre(genre)}>
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;
