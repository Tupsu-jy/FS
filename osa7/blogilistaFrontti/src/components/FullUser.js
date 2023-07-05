import React from "react";

function FullUser({ user }) {
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default FullUser;
