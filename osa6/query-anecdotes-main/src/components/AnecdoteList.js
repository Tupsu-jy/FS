import React, { useContext } from 'react'
//import { useDispatch } from 'react-redux'
import { useAnecdotes, useUpdateVote } from '../services/anecdoteService';
//import { setNotification } from '../reducers/notificationReducer';
import { NotificationContext } from '../contexts/NotificationContext'

const AnecdoteList = () => {
  const { data: anecdotes, isError, isLoading } = useAnecdotes();
  const updateVoteMutation = useUpdateVote();
  const { dispatch } = useContext(NotificationContext)

  const handleVote = (anecdote) => {
    updateVoteMutation.mutate({
      id: anecdote.id,
      updatedAnecdote: {
        ...anecdote,
        votes: anecdote.votes + 1,
      },
    });
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: `You voted for !` + anecdote.content
    })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error loading anecdotes</div>
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
