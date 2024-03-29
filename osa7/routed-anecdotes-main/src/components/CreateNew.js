import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

// Helper function to omit reset from the object
const omitReset = ({ reset, ...rest }) => rest;

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })

    navigate('/')
  }

  const handleReset = (e) => {
    e.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...omitReset(content)} />
        </div>
        <div>
          author
          <input name='author' {...omitReset(author)} />
        </div>
        <div>
          url for more info
          <input name='info' {...omitReset(info)} />
        </div>
        <button>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
