import React, { useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { NotificationContext } from '../contexts/NotificationContext'
import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

// Fetch all anecdotes
export function useAnecdotes() {
  return useQuery('anecdotes', async () => {
    const { data } = await axios.get(baseUrl)
    return data
  })
}

// Create a new anecdote
export function useCreateAnecdote() {
  const queryClient = useQueryClient()
  const { dispatch } = useContext(NotificationContext)

  return useMutation(
    async (newAnecdote) => {
      const { data } = await axios.post(baseUrl, newAnecdote)
      return data
    },
    {
      // After a successful creation, invalidate the 'anecdotes' query to refetch and update the list
      onSuccess: () => {
        queryClient.invalidateQueries('anecdotes')
      },
      onError: (error) => {
        dispatch({
          type: 'SET_NOTIFICATION',
          payload: `Error!!!!! '${error.message}' created!`
        })
      },
    }
  )
}

// Update a vote
export function useUpdateVote() {
  const queryClient = useQueryClient()

  return useMutation(
    async ({ id, updatedAnecdote }) => {
      const { data } = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
      return data
    },
    {
      // After a successful vote update, invalidate the 'anecdotes' query to refetch and update the list
      onSuccess: () => {
        queryClient.invalidateQueries('anecdotes')
      },
    }
  )
}
