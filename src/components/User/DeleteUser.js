import React, { useState } from "react";

const DeleteUser = ({ refreshUsers }) => {
  const [id, setId] = useState("");

  const handleDelete = async () => {
    const response = await fetch(`https://672a33bd976a834dd0228aa9.mockapi.io/api/vi/students/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("삭제 성공!");
      refreshUsers();
    }
  };

  return (
    <div>
      <h3>Delete User</h3>
      <input
        type="text"
        placeholder="Enter ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteUser;
