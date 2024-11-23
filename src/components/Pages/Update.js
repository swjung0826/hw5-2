import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 추가
import GetUser from "../User/GetUser"; // GetUser 컴포넌트 불러오기

const Update = () => {
  const [userId, setUserId] = useState(""); // 사용자 ID를 입력받기 위한 상태
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    student_id: "",
    major: "",
  });
  const [editCount, setEditCount] = useState(0); // 수정 횟수 상태
  const [users, setUsers] = useState([]); // 사용자 목록을 위한 상태
  const [canChangeUserId, setCanChangeUserId] = useState(false); // userId 변경 가능 여부
  const [canGoToList, setCanGoToList] = useState(false); // List로 가는 버튼 활성화 여부
  const [initialUserId, setInitialUserId] = useState(true); // userId 처음 입력 여부
  const [tempUserId, setTempUserId] = useState(""); // 임시 userId 상태 (alert 후 원래 값으로 되돌리기 위한 변수)

  const nameRef = useRef();
  const ageRef = useRef();
  const studentIdRef = useRef();
  const majorRef = useRef();

  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate

  useEffect(() => {
    // 사용자 목록 가져오기
    fetch("https://672a33bd976a834dd0228aa9.mockapi.io/api/vi/students")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    if (userId && !initialUserId) {
      // userId가 있을 때만 해당 사용자 데이터를 가져옴
      fetch(`https://672a33bd976a834dd0228aa9.mockapi.io/api/vi/students/${userId}`)
        .then((res) => res.json())
        .then((data) => setUserData(data))
        .catch((err) => alert("User not found"));
    }
  }, [userId, initialUserId]); // userId가 변경될 때마다 해당 사용자 데이터를 가져옵니다.

  useEffect(() => {
    // 모든 입력 필드가 채워져 있으면 `userId` 변경 가능하도록 설정
    if (userData.name && userData.age && userData.student_id && userData.major) {
      setCanChangeUserId(true); // userId 변경 가능
    } else {
      setCanChangeUserId(false); // 필드가 비어있으면 userId 변경 불가
    }

    // 모든 입력 필드가 채워져 있어야 List 페이지로 이동 가능
    if (userData.name && userData.age && userData.student_id && userData.major) {
      setCanGoToList(true); // List 페이지로 이동 가능
    } else {
      setCanGoToList(false); // 비어있으면 이동 불가
    }
  }, [userData]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    const updatedData = { ...userData, [name]: value };
    setUserData(updatedData);

    // 수정 횟수 증가
    setEditCount((prevCount) => prevCount + 1);

    // PUT 요청으로 수정된 값 즉시 API에 반영
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

    // 사용자의 데이터가 수정된 후, 즉시 users 목록에 반영
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, ...updatedData } : user
      )
    );
  };

  const handleUserIdChange = (e) => {
    const newUserId = e.target.value;
    setTempUserId(newUserId); // 임시 userId로 변경

    // userId를 변경하려면 모든 필드가 채워져 있어야 함
    if (initialUserId) {
      // userId를 처음 입력할 때는 필드가 비어 있어도 가능
      setInitialUserId(false); // 첫 번째 입력 이후에는 변경 체크를 시작
    } else {
      if (!userData.name || !userData.age || !userData.student_id || !userData.major) {
        alert("Please fill all the fields before changing User ID.");
        // userId를 변경하지 않고, 임시 userId를 이전 값으로 되돌림
        setTempUserId(userId);
        return;
      }
    }

    setUserId(newUserId); // 실제 userId를 변경
  };

  const goToListPage = () => {
    // 유효성 검사: 입력 필드가 비어 있으면 List 페이지로 돌아갈 수 없음
    if (!userData.name || !userData.age || !userData.student_id || !userData.major) {
      alert("Please fill all the fields before leaving.");
      return;
    }
    navigate("/"); // List.js 페이지로 이동
  };

  return (
    <div className="container">
      <h2>Update User</h2>

      <div>
        <label>User ID</label>
        <input
          type="text"
          value={tempUserId} // 임시 userId로 값을 표시
          onChange={handleUserIdChange} // userId 변경 시 유효성 체크
          className="form-control mb-2"
          placeholder="Enter User ID"
        />
      </div>

      {userId && (
        <>
          <p>Total edits made: {editCount}</p> {/* 수정 횟수 표시 */}

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

      {/* List 페이지로 돌아가는 버튼 */}
      <button
        className="btn btn-primary mt-3"
        onClick={goToListPage}
        disabled={!canGoToList} // 입력이 완료된 상태에서만 이동 가능
      >
        Go to User List
      </button>
    </div>
  );
};

export default Update;
