import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Blog({ blog, handleNewLike, handleDelete }) {
  const [isExtendedView, setIsExtendedView] = useState(false);

  const toggleView = () => {
    setIsExtendedView(!isExtendedView);
  };

  const defaultView = (
    <>
      {blog.title}
      {' '}
      {blog.author}
    </>
  );

  const extendedView = (
    <>
      <div id="blog-title">{blog.title}</div>
      <div id="blog-author">{blog.author}</div>
      <div id="blog-likes">
        {blog.likes}
        <button id="like-button" type="button" onClick={() => handleNewLike(blog)}>like</button>
      </div>
      <div><a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a></div>
      <div>{blog.user ? blog.user.name : 'Name of the person who added this has not been recorded'}</div>
      {blog.user && localStorage.getItem('username') === blog.user.username && (
        <button id="delete-button" type="button" onClick={() => handleDelete(blog)}>delete</button>
      )}
    </>
  );

  return (
    <div className="blog">
      {isExtendedView ? extendedView : defaultView}
      <button id="details-button" type="button" onClick={toggleView}>
        {isExtendedView ? 'Hide details' : 'Show details'}
      </button>
    </div>
  );
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string,
      username: PropTypes.string,
    }),
  }).isRequired,
  handleNewLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Blog;
