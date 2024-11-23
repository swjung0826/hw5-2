import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Link를 사용하여 페이지 이동
import CreateUser from "../User/CreateUser";
import GetUser from "../User/GetUser";
import UpdateUser from "../User/UpdateUser";
import DeleteUser from "../User/DeleteUser";

const List = () => {
  const [users, setUsers] = useState([]);

  // users 데이터를 새로 고치는 함수
  const refreshUsers = () => {
    fetch("https://672a33bd976a834dd0228aa9.mockapi.io/api/vi/students")
      .then((res) => res.json())
      .then((data) => setUsers(data)); // 데이터를 가져와서 상태 업데이트
  };

  useEffect(() => {
    refreshUsers(); // 컴포넌트가 처음 렌더링될 때 사용자 목록을 갱신합니다.
  }, []);

  return (
    <div className="container">
      <h2>CRUD Program</h2>
      {/* CreateUser 컴포넌트에 refreshUsers 전달 */}
      <CreateUser refreshUsers={refreshUsers} />
      <UpdateUser refreshUsers={refreshUsers} />
      <DeleteUser refreshUsers={refreshUsers} />
      <h3>User List</h3>
      <div>
        {users.map((user) => (
          <div key={user.id}>
            {/* 사용자 ID를 클릭하면 Detail.js로 이동 */}
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
