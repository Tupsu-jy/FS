// Blogs.js
import React, { useContext, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  useAllBlogs,
  useCustomDeleteBlog,
  useCustomUpdateBlog,
} from "../services/blogs";
import Blog from "./Blog";
import CreateBlog from "./Createblog";
import Togglable from "./Togglable";
import { UserContext } from "../contexts/UserContext";

function Blogs({ showNotification }) {
  const { user, dispatch } = useContext(UserContext);
  const noteFormRef = useRef();
  const queryClient = useQueryClient();
  const { data: blogs, isError, isLoading } = useAllBlogs();

  const handleNewBlog = () => {
    noteFormRef.current.toggleVisibility();
  };

  const updateBlogMutation = useCustomUpdateBlog(queryClient, showNotification);

  const handleNewLike = (blog) => {
    updateBlogMutation.mutate(blog);
  };

  const deleteBlogMutation = useCustomDeleteBlog(queryClient, showNotification);

  const handleDelete = async (blog) => {
    const confirmDelete = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    );
    if (confirmDelete) {
      try {
        await deleteBlogMutation.mutateAsync(blog.id);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      <Togglable buttonLabel="new blog" ref={noteFormRef}>
        <CreateBlog
          handleNewBlog={handleNewBlog}
          showNotification={showNotification}
        />
      </Togglable>
      {blogs
        ?.slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleNewLike={handleNewLike}
            handleDelete={handleDelete}
          />
        ))}
    </div>
  );
}

export default Blogs;
