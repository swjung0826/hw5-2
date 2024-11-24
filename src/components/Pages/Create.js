import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [student_id, setStudentId] = useState("");
  const [major, setMajor] = useState("");

  const nameRef = useRef();
  const ageRef = useRef();
  const studentIdRef = useRef();
  const majorRef = useRef();

  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!name) {
      nameRef.current.focus();
      alert("Name is required");
      return;
    }
    if (!age) {
      ageRef.current.focus();
      alert("Age is required");
      return;
    }
    if (!student_id) {
      studentIdRef.current.focus();
      alert("Student ID is required");
      return;
    }
    if (!major) {
      majorRef.current.focus();
      alert("Major is required");
      return;
    }

    const response = await fetch("https://672a33bd976a834dd0228aa9.mockapi.io/api/vi/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, age, student_id, major }),
    });

    if (response.ok) {
      alert("등록 성공!");
      setName("");
      setAge("");
      setStudentId("");
      setMajor("");

      document.getElementById("createModalClose").click();

      navigate('/List');
    }
  };

  return (
    <div className="container mt-5">
      <h3>Create Data</h3>

      <button
        type="button"
        className="btn btn-success"
        data-toggle="modal"
        data-target="#createModal"
      >
        Create User
      </button>

      <div
        className="modal fade"
        id="createModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="createModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createModalLabel">
                Create Data
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                id="createModalClose"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <input
                ref={nameRef}
                type="text"
                placeholder="Enter Name"
                className="form-control mb-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                ref={ageRef}
                type="number"
                placeholder="Enter Age"
                className="form-control mb-2"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <input
                ref={studentIdRef}
                type="text"
                placeholder="Enter Student ID"
                className="form-control mb-2"
                value={student_id}
                onChange={(e) => setStudentId(e.target.value)}
              />
              <input
                ref={majorRef}
                type="text"
                placeholder="Enter Major"
                className="form-control mb-2"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                id="createModalClose"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCreate}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
