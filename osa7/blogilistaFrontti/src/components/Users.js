import React, { useState, useEffect } from "react";
import userService from "../services/users";
import ListUser from "./ListUser";
import FullUser from "./FullUser";

function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    userService.getAllUsers().then((users) => setUsers(users));
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div>
      <h1>Users</h1>
      {selectedUser ? (
        <FullUser user={selectedUser} />
      ) : (
        users.map((user) => (
          <ListUser key={user.id} user={user} onUserClick={handleUserClick} />
        ))
      )}
    </div>
  );
}

export default Users;
