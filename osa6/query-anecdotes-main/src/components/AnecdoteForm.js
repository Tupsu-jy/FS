import React, { useContext } from 'react'
import { useCreateAnecdote } from '../services/anecdoteService'
import { NotificationContext } from '../contexts/NotificationContext'

const AnecdoteForm = () => {

  // Get the mutation function from useCreateAnecdote
  const createAnecdoteMutation = useCreateAnecdote();

  const { dispatch } = useContext(NotificationContext)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')

    // Use the mutation function to create a new anecdote
    createAnecdoteMutation.mutate({ content: content, votes: 0 })

    dispatch({
      type: 'SET_NOTIFICATION',
      payload: `New anecdote '${content}' created!`
    })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
