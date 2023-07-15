import { useAllAuthors } from "../connection/hooks";

const Authors = (props) => {
  const { authors, loading, error } = useAllAuthors();

  if (!props.show) {
    return null;
  }

  if (loading) {
    return <div>Loading authors...</div>;
  }

  if (error) {
    return <div>Error loading authors: {error.message}</div>;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Authors;
