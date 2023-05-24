import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Container } from "react-bootstrap";
import { CSpinner } from "@coreui/react";
import PopupFormThird from "../components/PopupFormThird";
import TeamListTable from "../components/TeamListTable";
import axios from "axios";
import apiHostName from "../config/index.js";

const TeamDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [team, setTeam] = useState();
  const [activeMemberData, setActiveMemberData] = useState();
  const [pendingMemberData, setPendingMemberData] = useState();
  const [rejectedMemberData, setRejectedMemberData] = useState();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);

  const handleAddMember = async (selectMember) => {
    // console.log(selectMember);
    const res = await axios
      .post(`${apiHostName}/team/member-team-joining/${id}`, {
        userId: selectMember[0],
        userRole: selectMember[1],
      })
      .catch((err) => {
        // console.log(err);
        return notify(err.response.status, err.response.data.message);
      });
    setLoading(true);
    if (res) {
      const data = await res;
      if (data.status === 201) {
        setShow(false);
      }
      fetchActiveMembers();
      return notify(data.status, data.data.message);
    }
  };

  const fetchActiveMembers = async () => {
    const res = await axios
      .get(`${apiHostName}/team/active-user`)
      .catch((err) => {
        // console.log(err);
        return notify(err.response.status, err.response.data.message);
      });
    setLoading(true);
    if (res) {
      const data = await res.data.result;

      const found = data.find((obj) => {
        return obj._id === id;
      });
      if (found) {
        setActiveMemberData(found.members);
        setData(found.members);
      } else {
        setActiveMemberData(0);
        setData("");
      }
    }
  };

  const fetchPendingMembers = async () => {
    const res = await axios
      .get(`${apiHostName}/team/pending-user`)
      .catch((err) => {
        // console.log(err);
        return notify(err.response.status, err.response.data.message);
      });
    setLoading(true);
    if (res) {
      // console.log(res.data);
      const data = await res.data.result;

      const found = data.find((obj) => {
        return obj._id === id;
      });
      // console.log(found.members);
      if (found) {
        setPendingMemberData(found.members);
        setData(found.members);
      } else {
        setPendingMemberData(0);
        setData("");
      }
    }
  };

  const fetchRejectedMembers = async () => {
    const res = await axios
      .get(`${apiHostName}/team/rejected-user`)
      .catch((err) => {
        console.log(err);
        return notify(err.response.status, err.response.data.message);
      });
    setLoading(true);
    if (res) {
      // console.log(res.data.result);
      const data = await res.data.result;

      const found = data.find((obj) => {
        return obj._id === id;
      });
      if (found) {
        setRejectedMemberData(found.members);
        setData(found.members);
      } else {
        setRejectedMemberData(0);
        setData("");
      }
    }
  };

  const featchSingleTeam = async (id) => {
    const res = await axios
      .get(`${apiHostName}/team/fetchTeam/${id}`)
      .catch((err) => {
        // console.log(err);
        return notify(err.response.status, err.response.data.message);
      });
    setLoading(true);
    if (res) {
      const data = await res.data;
      setTeam(data.teamInfo[0]);
      // console.log(data);
      fetchActiveMembers();
      fetchPendingMembers();
      fetchRejectedMembers();
    }
  };

  useEffect(() => {
    featchSingleTeam(id);
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
      : status === 201
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
      <PopupFormThird
        visible={show}
        onClose={handleClose}
        onAddMember={handleAddMember}
      />
      <Container>
        <div className="md:flex justify-between items-center mt-3 mb-4">
          <div>
            <h6>Team</h6>
            <h4 className="font-bold">{team?.teamName}</h4>
          </div>
          <div className="flex justify-between items-center gap-3">
            <button
              className="rounded text-blue-700 border-2 border-blue-700 bg-white "
              onClick={() => navigate("/dashboard")}
            >
              Back
            </button>
            <button
              type="submit"
              className="rounded text-blue-700 border-2 border-blue-700 bg-white "
              onClick={() => setShow(true)}
            >
              Add members
            </button>
          </div>
        </div>

        <div className="flex items-center justify-start gap-3 mb-4">
          <button
            className="rounded text-blue-700 border-2 border-blue-700 bg-white "
            onClick={() => fetchActiveMembers()}
          >
            Active members
            {loading ? (
              activeMemberData == "" ? (
                " (0)"
              ) : (
                ` (${activeMemberData?.length})`
              )
            ) : (
              <CSpinner size="sm" />
            )}
          </button>
          <button
            className="rounded text-slate-400 border-2 border-slate-400 bg-white "
            onClick={() => fetchPendingMembers()}
          >
            Pending members
            {loading ? (
              pendingMemberData != "" ? (
                ` (${pendingMemberData?.length})`
              ) : (
                " (0)"
              )
            ) : (
              <CSpinner size="sm" />
            )}
          </button>
          <button
            className="rounded text-red-400 border-2 border-red-400 bg-white "
            onClick={() => fetchRejectedMembers()}
          >
            Rejected members{" "}
            {loading ? (
              rejectedMemberData != "" ? (
                ` (${rejectedMemberData?.length})`
              ) : (
                " (0)"
              )
            ) : (
              <CSpinner size="sm" />
            )}
          </button>
        </div>

        <div>
          {data ? (
            <TeamListTable data={data} loading={loading} />
          ) : (
            <h2 className="text-center py-5 border-2 border-slate-400 rounded-lg">
              No members in this list
            </h2>
          )}
        </div>
      </Container>
    </>
  );
};

export default TeamDetails;
