import React from "react";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/Create'); // '/Create' 경로로 이동
  };

  return (
    <button
      type="button"
      className="btn btn-success"
      onClick={handleNavigate}
    >
      Create DATA
    </button>
  );
};

export default CreateUser;
