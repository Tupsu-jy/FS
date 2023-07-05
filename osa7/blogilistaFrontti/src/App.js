import React, { useState, useEffect, useRef, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  useAllBlogs,
  useUpdateBlog,
  useCustomDeleteBlog,
  useCustomUpdateBlog,
} from "./services/blogs";
import Blog from "./components/Blog";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CreateBlog from "./components/Createblog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Users from "./components/Users";
import Blogs from "./components/Blogs";
import {
  NotificationContext,
  NotificationProvider,
} from "./contexts/NotificationContext";
import { UserContext } from "./contexts/UserContext";
import NavBar from "./components/NavBar";

function App() {
  const { user, dispatch } = useContext(UserContext);
  const { notification, setNotification } = useContext(NotificationContext);
  const noteFormRef = useRef();

  const queryClient = useQueryClient();
  const { data: blogs, isError, isLoading } = useAllBlogs();

  const showNotification = (text, success) => {
    setNotification({ text, success });
  };

  const handleNewBlog = () => {
    noteFormRef.current.toggleVisibility();
  };

  const handleLogin = () => {
    dispatch({
      type: "LOGIN",
      payload: {
        token: localStorage.getItem("token"),
        username: localStorage.getItem("username"),
        name: localStorage.getItem("name"),
      },
    });
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
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
      {notification && (
        <Notification text={notification.text} success={notification.success} />
      )}

      {user.token ? (
        <Router>
          <NavBar handleLogout={handleLogout} />
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route
              path="/"
              element={<Blogs showNotification={showNotification} />}
            />
          </Routes>
        </Router>
      ) : (
        <div>
          <Login
            handleLogin={handleLogin}
            showNotification={showNotification}
          />
          <Signup showNotification={showNotification} />
        </div>
      )}
    </div>
  );
}

export default App;
