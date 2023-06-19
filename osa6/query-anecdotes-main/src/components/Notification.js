import React, { useContext, useEffect } from 'react'
import { NotificationContext } from '../contexts/NotificationContext'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const { notification, dispatch } = useContext(NotificationContext)

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [notification, dispatch])

  if (!notification) {
    return null
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
