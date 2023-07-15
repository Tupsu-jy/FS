import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS, ADD_BOOK, SET_BIRTHYEAR } from "./queries";

export const useSetAuthorBirthYear = () => {
  const [mutate, result] = useMutation(SET_BIRTHYEAR);

  const setBirthYear = ({ name, born }) => {
    mutate({
      variables: { name, born: Number(born) },
      refetchQueries: [{ query: ALL_AUTHORS }],
    });
  };

  return { setBirthYear, result };
};

export const useAddBook = () => {
  const [mutate, result] = useMutation(ADD_BOOK);

  const addBook = ({ title, author, published, genres }) => {
    mutate({
      variables: { title, author, published: Number(published), genres },
    });
  };

  return { addBook, result };
};

export const useAllBooks = () => {
  const { data, loading, error } = useQuery(ALL_BOOKS);

  return {
    books: data ? data.allBooks : [],
    loading,
    error,
  };
};

const useAllAuthors = () => {
  const { data, loading, error } = useQuery(ALL_AUTHORS);

  if (loading) return { loading };
  if (error) return { error };

  return { authors: data.allAuthors };
};

export { useAllAuthors };
