import React, { useState, useEffect } from "react";
import { useAllBooks, useBooksByGenre, useBookAddedSubscription } from "../connection/hooks";

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState("all genres");
  const allBooks = useAllBooks();
  const booksByGenre = useBooksByGenre(selectedGenre);
  const { data: newBookData } = useBookAddedSubscription();

  const { books, loading, error } =
    selectedGenre === "all genres" ? allBooks : booksByGenre;

  useEffect(() => {
    if (newBookData && newBookData.bookAdded) {
      alert(`New book added: ${newBookData.bookAdded.title}`);
    }
  }, [newBookData]);

  if (!props.show) {
    return null;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  const genres = [...new Set(allBooks.books.flatMap((book) => book.genres))];

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
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
