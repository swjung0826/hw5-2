import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // useParams로 URL 파라미터를 가져옵니다.

const Detail = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams(); // URL에서 userId를 가져옵니다.
  const navigate = useNavigate(); // List로 돌아가기 위한 navigate

  useEffect(() => {
    // 사용자 상세 정보를 가져오기 위한 API 호출
    fetch(`https://672a33bd976a834dd0228aa9.mockapi.io/api/vi/students/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data)) // 가져온 데이터를 state에 저장
      .catch((err) => console.error("User not found"));
  }, [userId]); // userId가 변경될 때마다 데이터를 가져옵니다.

  const goBackToList = () => {
    navigate("/"); // List.js 페이지로 이동
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

          {/* List 페이지로 돌아가는 버튼 */}
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
