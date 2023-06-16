// AnecdoteList.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { initializeAnecdotesRequest, voteAnecdoteRequest } from '../reducers/anecdoteReducer' // import the vote action creator
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch();
  const anecdotes = useSelector(state => state.anecdotes)

  useEffect(() => {
    dispatch(initializeAnecdotesRequest());
  }, [dispatch]);

  // vote action creator is used directly
  const voteAnecdote = (id) => {
    dispatch(voteAnecdoteRequest(id))
    dispatch(setNotification(`you voted '${anecdotes.find(anecdote => anecdote.id === id).content}'`, 5000))
  }

  const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  const sortedAnecdotes = [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
