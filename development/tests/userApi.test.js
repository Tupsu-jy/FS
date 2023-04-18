/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./helper');
const app = require('../app');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
});

describe('adding new users,', () => {
  test('posting new user with valid values works', async () => {
    await api.post('/api/users').send(helper.userWithValidValues).expect(201);
  });
  test.each(helper.usersWithInvalidOrMissingValues)(
    'given %p argument, returns 400',
    async (user) => {
      await api.post('/api/users').send(user).expect(400);
    },
  );
});
