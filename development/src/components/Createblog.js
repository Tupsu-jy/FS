import React, { useState } from 'react';
import blogService from '../services/blogs';

const CreateBlog = ({ handleNewBlog, showNotification }) => {
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
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">URL:</label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateBlog;
