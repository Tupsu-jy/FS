import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import NotificationContextProvider from './contexts/NotificationContext'
import Notification from './components/Notification'
import { QueryClient, QueryClientProvider } from 'react-query'

const App = () => {

  // Create a client
  const queryClient = new QueryClient()

  return (
    <NotificationContextProvider>
      <QueryClientProvider client={queryClient}>
        <div>
          <Notification />
          <h2>Anecdotes</h2>
          <AnecdoteList />
          <AnecdoteForm />
        </div>
      </QueryClientProvider>
    </NotificationContextProvider>
  )
}

export default App
