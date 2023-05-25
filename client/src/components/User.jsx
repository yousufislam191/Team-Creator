import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { CSpinner } from "@coreui/react";
import { ToastContainer, toast } from "react-toastify";
import UserPendingRequest from "./UserPendingRequest";
import axios from "axios";

import apiHostName from "../config/index.js";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import Card from "./Card";

const User = () => {
  const [showPendingRquest, setShowPendingRquest] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userPendingData, setuserPendingData] = useState();
  const [userActiveTeamData, setuserActiveTeamData] = useState();
  const [U_id, setU_id] = useState();
  const navigate = useNavigate();

  const pendingRquest = () => {
    setShowPendingRquest(true);
  };

  const getPendingRequest = async (u_id) => {
    const res = await axios
      .get(`${apiHostName}/team/user-pending-request/${u_id}`)
      .catch((err) => {
        console.log(err);
        // return notify(err.response.status, err.response.data.message);
      });
    setLoading(true);
    if (res) {
      const data = await res.data.result;
      setuserPendingData(data);
    }
  };

  const getUserActiveTeamData = async (u_id) => {
    const res = await axios
      .get(`${apiHostName}/team/user-team-active/${u_id}`)
      .catch((err) => {
        console.log(err);
        // return notify(err.response.status, err.response.data.message);
      });
    setLoading(true);
    if (res) {
      const data = await res.data.result;
      setuserActiveTeamData(data);
    }
  };

  const handleAccept = async (id) => {
    const [userId, teamId] = id;
    const res = await axios
      .patch(`${apiHostName}/team/user-accepting-request`, {
        memberId: userId,
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(true);
    if (res) {
      const data = await res;
      notify(data.status, data.data.message);
      navigate(`/dashboard/${teamId}`);
    }
  };

  const handleReject = async (id) => {
    const [userId, teamId] = id;
    const res = await axios
      .patch(`${apiHostName}/team/user-rejecting-request`, {
        memberId: userId,
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(true);
    if (res) {
      const data = await res;
      notify(data.status, data.data.message);
      getPendingRequest(U_id);
    }
  };

  useEffect(() => {
    const u_id = JSON.parse(localStorage.getItem("u_id"));
    setU_id(u_id);
    getUserActiveTeamData(u_id);
    getPendingRequest(u_id); // Initial request

    // const interval = setInterval(getPendingRequest(u_id), 2000); // Every 3 seconds?
    // return () => {
    //   clearInterval(interval);
    // };
  }, []);

  const notify = (status, message) =>
    status === 500
      ? toast.error(message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      : status === 200
      ? toast.success(message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      : status === 404
      ? toast.warn(message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      : null;

  return (
    <>
      <ToastContainer />
      {loading ? (
        <Container>
          <div className="d-flex justify-content-between align-items-center mt-3 mb-5">
            <h2 className="me-3">Team Creator Management System</h2>
            {showPendingRquest ? (
              <button
                type="submit"
                className="rounded bg-blue-600 border-2 border-blue-200 text-white px-5"
                onClick={() => {
                  setShowPendingRquest(false);
                }}
              >
                Back
              </button>
            ) : (
              <button
                type="submit"
                className="rounded bg-blue-600 border-2 border-blue-200 text-white "
                onClick={() => {
                  pendingRquest();
                }}
              >
                Pending Request
                {loading ? (
                  userPendingData == "" ? (
                    " (0)"
                  ) : (
                    ` (${userPendingData?.length})`
                  )
                ) : (
                  <CSpinner size="sm" />
                )}
              </button>
            )}
          </div>

          {showPendingRquest ? (
            <UserPendingRequest
              userPendingData={userPendingData}
              onAccept={handleAccept}
              onReject={handleReject}
              loading={loading}
            />
          ) : (
            <div>
              <h4 className="font-bold mb-3">Your Team</h4>
              {userActiveTeamData != "" ? (
                <div className="grid md:grid-cols-3 grid-flow-row md:gap-x-24 gap-y-10">
                  <Card
                    userActiveTeamData={userActiveTeamData}
                    loading={loading}
                  />
                </div>
              ) : (
                <h2 className="w-full text-center py-5 border-2 border-slate-400 rounded-lg">
                  You have no active team
                </h2>
              )}
            </div>
          )}
        </Container>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default User;
