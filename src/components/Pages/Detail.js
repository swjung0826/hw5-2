import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 

const Detail = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams(); 
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch(`https://672a33bd976a834dd0228aa9.mockapi.io/api/vi/students/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data)) 
      .catch((err) => console.error("User not found"));
  }, [userId]); 

  const goBackToList = () => {
    navigate("/"); 
  };

  return (
    <div className="container">
      {user ? (
        <div>
          <h2>User Details</h2>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Student ID:</strong> {user.student_id}</p>
          <p><strong>Major:</strong> {user.major}</p>

          <button onClick={goBackToList} className="btn btn-primary">
            Go to User List
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Detail;
