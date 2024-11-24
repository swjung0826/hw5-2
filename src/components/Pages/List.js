import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CreateUser from "../User/CreateUser";
import GetUser from "../User/GetUser";
import UpdateUser from "../User/UpdateUser";
import DeleteUser from "../User/DeleteUser";

const List = () => {
  const [users, setUsers] = useState([]);

  const refreshUsers = () => {
    fetch("https://672a33bd976a834dd0228aa9.mockapi.io/api/vi/students")
      .then((res) => res.json())
      .then((data) => setUsers(data)); 
  };

  useEffect(() => {
    refreshUsers(); 
  }, []);

  return (
    <div className="container">
      <h2>CRUD Program</h2>
      <CreateUser refreshUsers={refreshUsers} />
      <UpdateUser refreshUsers={refreshUsers} />
      <DeleteUser refreshUsers={refreshUsers} />
      <h3>User List</h3>
      <div>
        {users.map((user) => (
          <div key={user.id}>
            <Link to={`/Detail/${user.id}`}>
              {user.id} - {user.name} ({user.age})
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
