import React, { useState } from "react";
import { Container } from "react-bootstrap";
import PopupForm from "./PopupForm";
import TeamList from "./TeamList";
import PopupFormSecond from "./PopupFormSecond";

const Admin = () => {
  const [show, setShow] = useState(false);
  const [showSecond, setShowSecond] = useState(true);
  const handleClose = () => setShow(false);
  const handleCloseSecond = () => setShowSecond(false);

  const handleTeamName = (teamNameValue) => {
    console.log(teamNameValue);
    setShow(false);
    <PopupFormSecond visible={showSecond} onClose={handleCloseSecond} />;
  };

  return (
    <>
      <Container>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <h2>Team Creator Management System</h2>
          <button
            type="button"
            className="px-5 py-2 bg-white text-blue-700 rounded border-blue-700"
            onClick={() => setShow(true)}
          >
            + Create a group
          </button>
        </div>
        <PopupForm
          visible={show}
          onClose={handleClose}
          onTeamName={handleTeamName}
        />
        <div className="mt-5">
          <TeamList />
        </div>
      </Container>
    </>
  );
};

export default Admin;
