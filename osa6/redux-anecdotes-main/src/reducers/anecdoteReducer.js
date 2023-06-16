import { createSlice } from '@reduxjs/toolkit'
import anecdotes from '../utils/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const createAnecdoteObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    initializeAnecdotes: (state, action) => action.payload,
    voteForAnecdote: (state, action) => {
      const anecdoteToChange = state.find(anecdote => anecdote.id === action.payload)
      if (anecdoteToChange) {
        anecdoteToChange.votes += 1
      }
    },
    addNewAnecdote: (state, action) => {
      state.push(action.payload)
    }
  }
})

export const { initializeAnecdotes, voteForAnecdote, addNewAnecdote } = anecdoteSlice.actions

export const voteAnecdoteRequest = (id) => {
  return async (dispatch, getState) => {
    const anecdoteToChange = getState().anecdotes.find(anecdote => anecdote.id === id);
    if (anecdoteToChange) {
      const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }
      const updatedAnecdote = await anecdotes.updateVote(id, changedAnecdote);
      dispatch(voteForAnecdote(updatedAnecdote.id))
    }
  }
}

export const addNewAnecdoteRequest = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotes.createNew(createAnecdoteObject(content));
    dispatch(addNewAnecdote(newAnecdote))
  }
}

export const initializeAnecdotesRequest = () => {
  return async dispatch => {
    const response = await anecdotes.getAll();
    dispatch(initializeAnecdotes(response));
  };
};

export default anecdoteSlice.reducer
