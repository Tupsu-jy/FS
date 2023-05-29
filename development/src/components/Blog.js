import React, { useState } from 'react';

const Blog = ({ blog, handleNewLike, handleDelete }) => {
  const [isExtendedView, setIsExtendedView] = useState(false);

  const toggleView = () => {
    setIsExtendedView(!isExtendedView);
  };

  const defaultView = (
    <>
      {blog.title} {blog.author}
    </>
  );

  const extendedView = (
    <>
      <div>{blog.title}</div>
      <div>{blog.author}</div>
      <div>{blog.likes}<button onClick={() => handleNewLike(blog)}>like</button></div>
      <div><a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a></div>
      <div>{blog.user ? blog.user.name : "Name of the person who added this has not been recorded"}</div>
      {
        (blog.user && localStorage.getItem('username') === blog.user.username)
        && <button onClick={() => handleDelete(blog)}>delete</button>
      }
    </>
  );


  return (
    <>
      <div className="blog">
        {isExtendedView ? extendedView : defaultView}
        <button onClick={toggleView}>{isExtendedView ? 'Hide details' : 'Show details'}</button>
      </div>
    </>
  );
};

export default Blog;
