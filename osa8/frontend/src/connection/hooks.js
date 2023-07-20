import { useEffect } from "react";
import { useApolloClient, useSubscription } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client";
import {
  ALL_AUTHORS,
  ALL_BOOKS,
  ADD_BOOK,
  SET_BIRTHYEAR,
  LOGIN,
  BOOK_ADDED_SUBSCRIPTION,
  BOOKS_BY_CURRENT_USER_FAVORITE_GENRE,
  BOOKS_BY_GENRE,
} from "./queries";

export const useSetAuthorBirthYear = () => {
  const [mutate, result] = useMutation(SET_BIRTHYEAR);

  const setBirthYear = ({ name, born }) => {
    const token = localStorage.getItem("userToken");
    mutate({
      variables: { name, born: Number(born) },
      context: {
        headers: {
          authorization: token ? `bearer ${token}` : "",
        },
      },
      refetchQueries: [{ query: ALL_AUTHORS }],
    });
  };

  return { setBirthYear, result };
};

export const useAddBook = () => {
  const [mutate, result] = useMutation(ADD_BOOK);

  const addBook = ({ title, author, published, genres }) => {
    const token = localStorage.getItem("userToken");
    mutate({
      variables: { title, author, published: Number(published), genres },
      context: {
        headers: {
          authorization: token ? `bearer ${token}` : "",
        },
      },
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

export const useBooksByCurrentUserFavoriteGenre = () => {
  const { data, loading, error } = useQuery(BOOKS_BY_CURRENT_USER_FAVORITE_GENRE);

  return {
    books: data ? data.booksByCurrentUserFavoriteGenre : [],
    loading,
    error,
  };
};

export const useBooksByGenre = (genre) => {
  const { data, loading, error } = useQuery(BOOKS_BY_GENRE, { variables: { genre } });

  return {
    books: data ? data.booksByGenre : [],
    loading,
    error,
  };
};


export { useAllAuthors };

export const useLogin = () => {
  const [login, result] = useMutation(LOGIN);

  const executeLogin = async ({ username, password }) => {
    try {
      const { data } = await login({ variables: { username, password } });

      if (data && data.login) {
        localStorage.setItem("userToken", data.login.value);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { executeLogin, ...result };
};

export const useBookAddedSubscription = () => {
  const client = useApolloClient();
  const { data: subscriptionData, loading: subscriptionLoading } = useSubscription(BOOK_ADDED_SUBSCRIPTION);

  useEffect(() => {
    if (subscriptionData && !subscriptionLoading) {
      const cachedBooks = client.readQuery({ query: ALL_BOOKS });

      const updatedBooks = [...cachedBooks.allBooks, subscriptionData.bookAdded];

      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: updatedBooks },
      });

      client.reFetchObservableQueries();
    }
  }, [subscriptionData, subscriptionLoading, client]);

  return { data: subscriptionData, loading: subscriptionLoading };
}
