import React, { createContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

const NotificationContext = createContext();

function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    let newTimeoutId;
    if (notification) {
      clearTimeout(timeoutId);
      newTimeoutId = setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
    return () => {
      clearTimeout(newTimeoutId);
    };
  }, [notification]);
  const value = useMemo(
    () => ({ notification, setNotification }),
    [notification, setNotification]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

NotificationProvider.defaultProps = {
  children: null,
};

NotificationProvider.propTypes = {
  children: PropTypes.node,
};

export { NotificationContext, NotificationProvider };
