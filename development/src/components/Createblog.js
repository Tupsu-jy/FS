import React, { useState } from 'react';
import PropTypes from 'prop-types';
import blogService from '../services/blogs';

function CreateBlog({ handleNewBlog, showNotification }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setTitle('');
    setAuthor('');
    setUrl('');
    const response = await blogService.postNewBlog(title, author, url);
    if (response.status >= 200 && response.status < 300) {
      showNotification(`Blog ${title} by ${author} added`, true);
    } else {
      showNotification(`Error adding blog ${title} by ${author}`, false);
    }
    handleNewBlog();
  };

  return (
    <div>
      <h2>Create Blog Entry</h2>
      <form id="new-blog-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">
            Title:
            <input
              type="text"
              id="new-blog-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="author">
            Author:
            <input
              type="text"
              id="new-blog-author"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="url">
            URL:
            <input
              type="text"
              id="new-blog-url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
            />
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

CreateBlog.propTypes = {
  handleNewBlog: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
};

export default CreateBlog;
