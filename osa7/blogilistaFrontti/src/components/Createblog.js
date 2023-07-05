import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { usePostNewBlog } from "../services/blogs";
import { NotificationContext } from "../contexts/NotificationContext";

function CreateBlog({ handleNewBlog }) {
  const { setNotification } = useContext(NotificationContext);
  const [formTitle, setFormTitle] = useState("");
  const [formAuthor, setFormAuthor] = useState("");
  const [formUrl, setFormUrl] = useState("");

  const postNewBlogMutation = usePostNewBlog(handleNewBlog, setNotification);

  const handleSubmit = (event) => {
    event.preventDefault();
    const currentTitle = formTitle;
    const currentAuthor = formAuthor;
    const currentUrl = formUrl;
    setFormTitle("");
    setFormAuthor("");
    setFormUrl("");
    postNewBlogMutation.mutate({
      title: currentTitle,
      author: currentAuthor,
      url: currentUrl,
    });
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
              value={formTitle}
              onChange={(event) => setFormTitle(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="author">
            Author:
            <input
              type="text"
              id="new-blog-author"
              value={formAuthor}
              onChange={(event) => setFormAuthor(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="url">
            URL:
            <input
              type="text"
              id="new-blog-url"
              value={formUrl}
              onChange={(event) => setFormUrl(event.target.value)}
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
};

export default CreateBlog;
