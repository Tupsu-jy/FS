import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'

describe('<Blog />', () => {
  let component
  let mockHandler

  beforeEach(() => {
    const blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'https://testblog.com',
      likes: 5,
      user: { name: 'Test User', username: 'testuser' }
    }

    mockHandler = jest.fn()

    component = render(
      <Blog blog={blog} handleNewLike={mockHandler} />
    )
  })

  test('renders the blog title and author, but not url and likes by default', () => {
    expect(component.container).toHaveTextContent('Test Blog')
    expect(component.container).toHaveTextContent('Test Author')
    expect(component.container).not.toHaveTextContent('https://testblog.com')
    expect(component.container).not.toHaveTextContent('5')
  })

  test('renders the blog url and likes when the details button is clicked', () => {
    const button = component.getByText('Show details')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('https://testblog.com')
    expect(component.container).toHaveTextContent('5')
  })

  test('if the like button is clicked twice, the event handler is called twice', () => {
    const showDetailsButton = component.getByText('Show details')
    fireEvent.click(showDetailsButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})
