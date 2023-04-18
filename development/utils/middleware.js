/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken');
const logger = require('./logger');

const userExtractor = async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    request.userId = decodedToken.id;
  } catch (error) {
    next(new Error('Token missing or invalid'));
  }
  next();
};

const tokenExtractor = async (request, response, next) => {
  const authorization = await request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  } else {
    request.token = null;
  }
  next();
};

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

// eslint-disable-next-line consistent-return
const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.message === 'User who is not the blog creator tried to delete blog') {
    response.status(400).json({ error: error.message });
  } if (error.message === 'Blog not found') {
    return response.status(404).send({ error: error.message });
  } if (error.message === 'Token missing or invalid') {
    return response.status(401).send({ error: 'Unauthorized', message: error.message });
  } if (error.name === 'Error') {
    return response.status(400).send({ error: error.message });
  } if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  return response.status(400).json({ error: error.message });
};

module.exports = {
  userExtractor,
  tokenExtractor,
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
