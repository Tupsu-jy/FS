import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { addNewAnecdoteRequest } from '../reducers/anecdoteReducer' // import the addAnecdote action creator
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const newAnecdoteRef = useRef();

  const createAnecdote = (event) => {
    event.preventDefault();
    const content = newAnecdoteRef.current.value;
    dispatch(addNewAnecdoteRequest(content)); // addAnecdote action creator is used directly
    newAnecdoteRef.current.value = '';

    dispatch(setNotification(`you created a new anecdote: '${content}'`, 5000))

  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input ref={newAnecdoteRef} /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
