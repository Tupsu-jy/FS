const Author = require('../models/author');
const Book = require('../models/book');
const User = require('../models/user');
const { UserInputError, AuthenticationError } = require('apollo-server');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PubSub } = require('graphql-subscriptions');

const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: async () => Book.countDocuments(),
    authorCount: async () => Author.countDocuments(),
    allBooks: async (root, args) => {
      //come back tothis when doing frontend. Might be better to use id 
      //instead of name in query
      let query = {};

      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (!author) {
          throw new Error('Author not found');
        }
        query = { author: author._id };
      }

      if (args.genre) {
        query = { ...query, genres: { $in: [args.genre] } };
      }

      const books = await Book.find(query).populate('author');
      return books;
    },
    allAuthors: async () => Author.find(),
    me: async (root, args, context) => {
      return context.currentUser;
    },
    booksByCurrentUserFavoriteGenre: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const books = await Book.find({ genres: { $in: [currentUser.favoriteGenre] } }).populate('author');

      if (books.length === 0) {
        throw new UserInputError(`No books found with genre: ${args.genre}`);
      }

      return books;
    },
    booksByGenre: async (root, args) => {
      const books = await Book.find({ genres: { $in: [args.genre] } }).populate('author');

      if (books.length === 0) {
        throw new UserInputError(`No books found with genre: ${args.genre}`);
      }

      return books;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({ name: args.author });
        try {
          await author.save();
        } catch (e) {
          throw new UserInputError(e.message, {
            invalidArgs: args,
          });
        }
      }

      const book = new Book({ ...args, author: author._id });

      try {
        await book.save();
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        });
      }

      // update the bookCount
      author.bookCount += 1;
      try {
        await author.save();
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        });
      }

      book.author = author;

      pubsub.publish('BOOK_ADDED', { bookAdded: book });

      return book;
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const author = await Author.findOne({ name: args.name });

      if (!author) {
        return null;
      }

      author.born = args.setBornTo;

      try {
        await author.save();
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        });
      }

      return author;
    },
    createUser: async (root, args) => {
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(args.password, saltRounds);

      const user = new User({ ...args, passwordHash });

      try {
        await user.save();
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        });
      }

      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(args.password, user.passwordHash);

      if (!(user && passwordCorrect)) {
        throw new UserInputError("Invalid credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      const token = jwt.sign(userForToken, process.env.SECRET);

      return { value: token };
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },

};

module.exports = resolvers;
