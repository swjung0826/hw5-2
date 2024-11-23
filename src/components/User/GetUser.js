import React, { useEffect, useState } from "react";

const GetUser = ({ users, setUsers }) => {
  useEffect(() => {
    fetch("https://672a33bd976a834dd0228aa9.mockapi.io/api/vi/students")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [setUsers]);

  return (
    <div>
      <h3>User List</h3>
      <div>
        {users.map((user) => (
          <div key={user.id}>
            {user.id} - {user.name} ({user.age})
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetUser;
