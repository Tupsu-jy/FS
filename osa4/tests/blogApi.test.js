/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./helper');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('right number of blogs are returned', async () => {
  const response = await api.get('/api/blogs').expect(200);
  expect(response.body).toHaveLength(6);
});

test('id does not have underscore', async () => {
  const response = await api.get('/api/blogs').expect(200);
  expect(response.body[0].id).toBeDefined();
});

test('posting new blogs works', async () => {
  await api.post('/api/users').send(helper.userWithValidValues);
  const ret = await api.post('/api/login').send(helper.userWithValidValues);
  await api.post('/api/blogs').send(helper.listWithOneBlog[0]).set({ Authorization: `Bearer ${ret.body.token}` }).expect(201);
  const response = await api.get('/api/blogs').expect(200);

  const addedBlog = response.body.find(
    (blog) => blog.title === 'Go To Statement Considered Harmful2'
  );
  expect(addedBlog).toBeDefined();
  expect(addedBlog.author).toBe('Edsger W. Dijkstra');
  expect(addedBlog.likes).toBe(15);
  expect(addedBlog.url).toBe(
    'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
  );
});

test('adding new blogs without token fails with 401 Unauthorized', async () => {
  await api.post('/api/users').send(helper.userWithValidValues);
  await api.post('/api/login').send(helper.userWithValidValues);
  const response = await api
    .post('/api/blogs')
    .send(helper.listWithOneBlog[0])
    .expect(401);

  expect(response.body.error).toBe('Unauthorized');
  expect(response.body.message).toBe('Token missing or invalid');

  const blogsResponse = await api.get('/api/blogs').expect(200);
  const addedBlog = blogsResponse.body.find(
    (blog) => blog.title === 'Go To Statement Considered Harmful2'
  );

  expect(addedBlog).toBeUndefined();
});

test('posting new blog with undefined like attribute works', async () => {
  await api.post('/api/users').send(helper.userWithValidValues);
  const ret = await api.post('/api/login').send(helper.userWithValidValues);
  await api.post('/api/blogs').send(helper.blogWithUndefined).set({ Authorization: `Bearer ${ret.body.token}` }).expect(201);
  const response = await api.get('/api/blogs').expect(200);

  const addedBlog = response.body.find(
    (blog) => blog.title === 'Go To Statement Considered Harmful2'
  );
  expect(addedBlog).toBeDefined();
  expect(addedBlog.author).toBe('Edsger W. Dijkstra');
  expect(addedBlog.url).toBe(
    'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
  );
});

test('posting new blog with missing fields does not work', async () => {
  await api.post('/api/users').send(helper.userWithValidValues);
  const ret = await api.post('/api/login').send(helper.userWithValidValues);
  const response = await api.post('/api/blogs').send(helper.blogWithMissingFields).set({ Authorization: `Bearer ${ret.body.token}` }).expect(400);
  expect(response.body.error).toBe('Blog validation failed: title: Path `title` is required., url: Path `url` is required.');

});

test('updating blogs works', async () => {
  await api.put(`/api/blogs/${helper.blogWithSameId._id}`).send(helper.blogWithSameId).expect(200);
  const response = await api.get(`/api/blogs/${helper.blogWithSameId._id}`).expect(200);
  expect(response.body).toEqual({
    author: 'Santa Claus', id: '5a422aa71b54a676234d17f8', likes: 69, title: 'Go To Statement Considered Harmful 2.0 Electric boogaloo', url: 'http://www.meatspin.com',
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
