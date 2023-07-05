import React from "react";

function ListUser({ user, onUserClick }) {
  return (
    <div>
      <p onClick={() => onUserClick(user)}>
        {user.name} has created {user.blogs.length} blogs
      </p>
    </div>
  );
}

export default ListUser;
