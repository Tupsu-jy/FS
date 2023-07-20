import { gql } from '@apollo/client';

export const BOOKS_BY_CURRENT_USER_FAVORITE_GENRE = gql`
  query GetBooksByFavoriteGenre {
    booksByCurrentUserFavoriteGenre {
      title
      published
      author {
        name
        id
      }
      genres
    }
  }
`;

export const BOOKS_BY_GENRE = gql`
  query GetBooksByGenre($genre: String!) {
    booksByGenre(genre: $genre) {
      title
      published
      author {
        name
        id
      }
      genres
    }
  }
`;

export const BOOK_ADDED_SUBSCRIPTION = gql`
  subscription OnBookAdded {
    bookAdded {
      title
      author {
        id
        name
        born
      }
      published
      genres
    }
  }
`;

export const SET_BIRTHYEAR = gql`
  mutation UpdateAuthorBirthYear($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      id
      name
      born
    }
  }
`;

export const ADD_BOOK = gql`
  mutation CreateBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        id
        name
        born
      }
      published
      genres
    }
  }
`;

export const ALL_AUTHORS = gql`
  query GetAllAuthors {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query GetAllBooks {
    allBooks {
      title
      published
      author {
        name
        id
      }
      genres
    }
  }
`;

export const LOGIN = gql`
  mutation AuthenticateUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;
