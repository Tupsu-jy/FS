import React, { useState, useEffect } from 'react';

function Notification({ text, success }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // show the notification for 3 seconds
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 3000);
  }, [text]);

  const message = () => {
    if (text == null || show === false) {
      return null;
    } else {
      if (success) {
        return <div className='notification success'>{text}</div>;
      } else {
        return <div className='notification failure'>{text}</div>;
      }
    }
  };
  return (
    <>
      {message()}
    </>
  );
}

export default Notification;
