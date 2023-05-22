import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Container } from "react-bootstrap";
import PopupForm from "./PopupForm";
import TeamList from "./TeamList";
import PopupFormSecond from "./PopupFormSecond";
import axios from "axios";

import apiHostName from "../config/index.js";

const Admin = () => {
  const [show, setShow] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [teamValue, setTeamValue] = useState([]);
  const handleClose = () => setShow(false);
  const handleCloseSecond = () => setShowSecond(false);

  const handleTeamName = (teamNameValue) => {
    // console.log(teamNameValue);
    setTeamValue([...teamValue, teamNameValue.teamName]);
    setShow(false);
    if (teamNameValue !== null) {
      setShowSecond(true);
    }
  };

  const handleTeamCategory = (teamCategoryValue) => {
    // console.log(teamCategoryValue);
    setTeamValue([...teamValue, teamCategoryValue.teamCategory]);
    lastArray();
  };

  const lastArray = () => {
    if (teamValue.length !== 2) {
      notify("", "Please again click to continue button");
    } else {
      // console.log(teamValue);
      sendTeamCreateRequest(teamValue);
    }
  };

  const sendTeamCreateRequest = async (teamValue) => {
    // console.log(teamValue[0], teamValue[1]);
    const res = await axios
      .post(`${apiHostName}/team/create-team`, {
        teamName: teamValue[0],
        teamCategory: teamValue[1],
      })
      .catch((err) => {
        notify(err.response.status, err.response.data.message);
        // console.log(err);
      });
    if (res) {
      notify(res.status, res.data.message);
      setShowSecond(false);
    }
  };

  const notify = (status, message) =>
    status === 500
      ? toast.error(message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      : status === 201
      ? toast.success(message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      : toast.warn(message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

  return (
    <>
      <ToastContainer />
      <Container>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <h2>Team Creator Management System</h2>
          <button
            className="rounded text-blue-700 border-2 border-blue-700 bg-white "
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
        <PopupFormSecond
          visible={showSecond}
          onClose={handleCloseSecond}
          onTeamCategory={handleTeamCategory}
        />
        <div className="mt-5">
          <TeamList />
        </div>
      </Container>
    </>
  );
};

export default Admin;
