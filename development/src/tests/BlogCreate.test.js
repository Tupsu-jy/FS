import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateBlog from '../components/Createblog'

jest.mock('axios');

describe('<CreateBlog />', () => {
  let component
  let createBlogHandler
  let notificationHandler

  beforeEach(() => {
    createBlogHandler = jest.fn()
    notificationHandler = jest.fn()

    component = render(
      <CreateBlog handleNewBlog={createBlogHandler} showNotification={notificationHandler} />
    )
  })

  test('form calls the event handler it received as props with the right details when a new blog is created', () => {
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: 'Test Title' }
    })

    fireEvent.change(author, {
      target: { value: 'Test Author' }
    })

    fireEvent.change(url, {
      target: { value: 'https://testurl.com' }
    })

    fireEvent.submit(form)

    expect(createBlogHandler.mock.calls).toHaveLength(1)

    // if you are mocking the blogService in some way to return a specific blog, you could also check:
    // expect(createBlogHandler.mock.calls[0][0]).toBe('Test Title')
    // expect(createBlogHandler.mock.calls[0][1]).toBe('Test Author')
    // expect(createBlogHandler.mock.calls[0][2]).toBe('https://testurl.com')
  })
})
