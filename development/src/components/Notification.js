import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Notification({ text, success }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 3000);
  }, [text]);

  const message = () => {
    if (text === null || show === false) {
      return null;
    }
    if (success) {
      return <div className="notification success">{text}</div>;
    }
    return <div className="notification failure">{text}</div>;
  };

  return (
    <>
      {message()}
    </>
  );
}

Notification.propTypes = {
  text: PropTypes.string,
  success: PropTypes.bool,
};

Notification.defaultProps = {
  text: null,
  success: false,
};

export default Notification;
