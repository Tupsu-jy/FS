import React, { useContext } from "react";
import { NotificationContext } from "../contexts/NotificationContext";

function Notification() {
  const { notification } = useContext(NotificationContext);

  if (!notification) {
    return null;
  }

  return (
    <div
      className={`notification ${notification.success ? "success" : "failure"}`}
    >
      {notification.text}
    </div>
  );
}

export default Notification;
