import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Container } from "react-bootstrap";
import PopupForm from "./PopupForm";
import TeamList from "./TeamList";

const Admin = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

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
        <PopupForm visible={show} onClose={handleClose} />
        <div className="mt-5">
          <TeamList />
        </div>
      </Container>
    </>
  );
};

export default Admin;
