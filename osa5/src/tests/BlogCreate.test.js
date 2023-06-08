import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CreateBlog from '../components/Createblog';

jest.mock('../services/blogs', () => ({
  __esModule: true, // this property makes it work
  default: {
    postNewBlog: jest.fn(),
    // other methods you might need to mock...
  },
}));

// eslint-disable-next-line import/first
import blogService from '../services/blogs';

describe('<CreateBlog />', () => {
  let component;
  let createBlogHandler;
  let notificationHandler;

  beforeEach(() => {
    createBlogHandler = jest.fn();
    notificationHandler = jest.fn();

    blogService.postNewBlog.mockResolvedValue({
      status: 200,
      data: {
        title: 'Test Title',
        author: 'Test Author',
        url: 'https://testurl.com',
      },
    });

    component = render(
      <CreateBlog handleNewBlog={createBlogHandler} showNotification={notificationHandler} />,
    );
  });

  test('form calls the event handler it received as props with the right details when a new blog is created', async () => {
    const title = component.container.querySelector('#title');
    const author = component.container.querySelector('#author');
    const url = component.container.querySelector('#url');
    const form = component.container.querySelector('form');

    fireEvent.change(title, {
      target: { value: 'Test Title' },
    });

    fireEvent.change(author, {
      target: { value: 'Test Author' },
    });

    fireEvent.change(url, {
      target: { value: 'https://testurl.com' },
    });

    fireEvent.submit(form);

    // waitFor is necessary because blogService.postNewBlog is an async function.
    await waitFor(() => expect(blogService.postNewBlog).toHaveBeenCalled());

    // Check that blogService.postNewBlog was called with the correct arguments
    expect(blogService.postNewBlog).toHaveBeenCalledWith(
      'Test Title',
      'Test Author',
      'https://testurl.com',
    );

    // Check that handleNewBlog was called once after the blog creation
    expect(createBlogHandler).toHaveBeenCalledTimes(1);

    // Check that showNotification was called with the correct arguments
    expect(notificationHandler).toHaveBeenCalledWith('Blog Test Title by Test Author added', true);
  });
});
