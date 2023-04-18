/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const middleware = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate('user');
    response.status(200).json(blogs);
  } catch (exception) {
    next(exception);
  }
});

// eslint-disable-next-line consistent-return
blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  const {
    title, author, url, likes,
  } = request.body;
  console.log(request.userId);
  const user = await User.findById(request.userId);
  console.log(user);
  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user,
  });

  try {
    const savedBlog = await blog.save();
    await user.update({ $push: { blogs: savedBlog.id } });
    response.status(201).json(savedBlog);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (blog === null) {
      throw new Error('Blog not found');
    }
    response.status(200).json(blog);
  } catch (exception) {
    next(exception);
  }
});

// eslint-disable-next-line no-unused-vars
blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (blog.user._id.toString() === request.userId) {
      await User
        .updateOne({ _id: blog.user._id }, { $pull: { blogs: blog.id } });
      await Blog.findByIdAndDelete(blog.id);
      response.status(200).send('Blog deleted');
    } else {
      throw new Error('User who is not the blog creator tried to delete blog');
    }
  } catch (exception) {
    next(exception);
  }
});

// eslint-disable-next-line no-unused-vars
blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.updateOne({ _id: request.params.id }, request.body);
    response.status(200).json(blog);
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
