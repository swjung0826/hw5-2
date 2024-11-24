import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; 
import GetUser from "../User/GetUser"; 

const Update = () => {
  const [userId, setUserId] = useState(""); 
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    student_id: "",
    major: "",
  });
  const [editCount, setEditCount] = useState(0); 
  const [users, setUsers] = useState([]); 
  const [canChangeUserId, setCanChangeUserId] = useState(false); 
  const [canGoToList, setCanGoToList] = useState(false);
  const [initialUserId, setInitialUserId] = useState(true); 
  const [tempUserId, setTempUserId] = useState(""); 

  const nameRef = useRef();
  const ageRef = useRef();
  const studentIdRef = useRef();
  const majorRef = useRef();

  const navigate = useNavigate(); 

  useEffect(() => {
    fetch("https://672a33bd976a834dd0228aa9.mockapi.io/api/vi/students")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    if (userId && !initialUserId) {
      fetch(`https://672a33bd976a834dd0228aa9.mockapi.io/api/vi/students/${userId}`)
        .then((res) => res.json())
        .then((data) => setUserData(data))
        .catch((err) => alert("User not found"));
    }
  }, [userId, initialUserId]); 

  useEffect(() => {
    if (userData.name && userData.age && userData.student_id && userData.major) {
      setCanChangeUserId(true); 
    } else {
      setCanChangeUserId(false); 
    }

    
    if (userData.name && userData.age && userData.student_id && userData.major) {
      setCanGoToList(true); 
    } else {
      setCanGoToList(false); 
    }
  }, [userData]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    const updatedData = { ...userData, [name]: value };
    setUserData(updatedData);

    setEditCount((prevCount) => prevCount + 1);

    await fetch(
      `https://672a33bd976a834dd0228aa9.mockapi.io/api/vi/students/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, ...updatedData } : user
      )
    );
  };

  const handleUserIdChange = (e) => {
    const newUserId = e.target.value;
    setTempUserId(newUserId); 

    if (initialUserId) {
      setInitialUserId(false); 
    } else {
      if (!userData.name || !userData.age || !userData.student_id || !userData.major) {
        alert("Please fill all the fields before changing User ID.");
        setTempUserId(userId);
        return;
      }
    }

    setUserId(newUserId); 
  };

  const goToListPage = () => {
    if (!userData.name || !userData.age || !userData.student_id || !userData.major) {
      alert("Please fill all the fields before leaving.");
      return;
    }
    navigate("/"); 
  };

  return (
    <div className="container">
      <h2>Update User</h2>

      <div>
        <label>User ID</label>
        <input
          type="text"
          value={tempUserId} 
          onChange={handleUserIdChange} 
          className="form-control mb-2"
          placeholder="Enter User ID"
        />
      </div>

      {userId && (
        <>
          <p>Total edits made: {editCount}</p> 

          <div>
            <label>Name</label>
            <input
              ref={nameRef}
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              className="form-control mb-2"
            />
          </div>
          <div>
            <label>Age</label>
            <input
              ref={ageRef}
              type="number"
              name="age"
              value={userData.age}
              onChange={handleChange}
              className="form-control mb-2"
            />
          </div>
          <div>
            <label>Student ID</label>
            <input
              ref={studentIdRef}
              type="text"
              name="student_id"
              value={userData.student_id}
              onChange={handleChange}
              className="form-control mb-2"
            />
          </div>
          <div>
            <label>Major</label>
            <input
              ref={majorRef}
              type="text"
              name="major"
              value={userData.major}
              onChange={handleChange}
              className="form-control mb-2"
            />
          </div>
        </>
      )}

      <GetUser users={users} setUsers={setUsers} />

      <button
        className="btn btn-primary mt-3"
        onClick={goToListPage}
        disabled={!canGoToList} 
      >
        Go to User List
      </button>
    </div>
  );
};

export default Update;
