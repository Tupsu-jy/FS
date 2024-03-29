import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import blogService from "./services/blogs";
import Signup from "./components/Signup";
import CreateBlog from "./components/Createblog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [notification, setNotification] = useState({
    text: null,
    success: false,
  });
  const noteFormRef = useRef();

  const showNotification = (text, success) => {
    setNotification({ text, success });
  };

  const handleNewBlog = () => {
    noteFormRef.current.toggleVisibility();
    blogService.getAll().then((fetchedBlogs) => setBlogs(fetchedBlogs));
  };

  const handleNewLike = async (blog) => {
    const response = await blogService.updateBlog(blog);
    if (response.status === 200) {
      showNotification(`You liked ${blog.title} by ${blog.author}`, true);
      blogService.getAll().then((fetchedBlogs) => setBlogs(fetchedBlogs));
    } else {
      showNotification(response.data.error, false);
    }
  };

  const handleLogin = () => {
    setToken(localStorage.getItem("token"));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("name");
    setToken(localStorage.getItem("token"));
  };

  const handleDelete = async (blog) => {
    const confirmDelete = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    );
    if (confirmDelete) {
      const response = await blogService.deleteBlog(blog.id);
      if (response.status === 200) {
        showNotification(`Blog ${blog.title} by ${blog.author} deleted`, true);
        const updatedBlogs = blogs.filter((b) => b.id !== blog.id);
        setBlogs(updatedBlogs);
      } else {
        showNotification(response.data.error, false);
      }
    }
  };

  useEffect(() => {
    blogService.getAll().then((fetchedBlogs) => setBlogs(fetchedBlogs));
  }, []);

  return (
    <div>
      <Notification text={notification.text} success={notification.success} />
      {token ? (
        <div>
          <h2>blogs</h2>
          <p>
            {localStorage.getItem("name")} logged in{" "}
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </p>
          <Togglable buttonLabel="new blog" ref={noteFormRef}>
            <CreateBlog
              handleNewBlog={handleNewBlog}
              showNotification={showNotification}
            />
          </Togglable>
          {blogs
            .slice()
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
