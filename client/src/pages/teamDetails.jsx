import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import NavigationBar from "../components/Navbar";
import { Container } from "react-bootstrap";
import PopupFormThird from "../components/PopupFormThird";
import TeamListTable from "../components/TeamListTable";
import axios from "axios";

const TeamDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [team, setTeam] = useState();
  const [loading, setLoading] = useState(true);
  const [addMember, setAddMember] = useState([]);

  const handleClose = () => setShow(false);

  const handleAddMember = (selectMember) => {
    console.log(selectMember);
    // setAddMember([...addMember, selectMember]);
    // console.log(addMember);
    // setShow(false);
    // if (teamNameValue !== null) {
    //   setShowSecond(true);
    // }
  };

  const featchSingleTeam = async (id) => {
    const res = await axios
      .get(`http://localhost:6001/api/team/fetchTeam/${id}`)
      .catch((err) => {
        console.log(err);
        // return notify(err.response.status, err.response.data.message);
      });
    if (res) {
      const data = await res.data;
      setTeam(data.teamInfo[0]);
      // console.log(data);
    }
  };

  useEffect(() => {
    featchSingleTeam(id);
  }, []);

  return (
    <>
      {/* {loading ? (
        <Loading />
      ) : ( */}
      {/* <NavigationBar
        role={user?.role}
        name={user?.name}
        onLogout={handleLogout}
      /> */}
      {/* )} */}
      {/* <h1>{id}</h1> */}
      <PopupFormThird
        visible={show}
        onClose={handleClose}
        onAddMember={handleAddMember}
      />
      <Container>
        <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
          <div>
            <h6>Team</h6>
            <h4 className="font-bold">{team?.teamName}</h4>
          </div>
          <div>
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
            type="submit"
            className="rounded text-blue-700 border-2 border-blue-700 bg-white "
            onClick={() => {}}
          >
            Active members (15)
          </button>
          <button
            type="submit"
            className="rounded text-slate-400 border-2 border-slate-400 bg-white "
            onClick={() => {}}
          >
            Pending members (2)
          </button>
          <button
            type="submit"
            className="rounded text-red-400 border-2 border-red-400 bg-white "
            onClick={() => {}}
          >
            Rejected members (2)
          </button>
        </div>

        <div className="border-2 border-slate-400 px-4 py-2 rounded">
          <TeamListTable />
        </div>
      </Container>
    </>
  );
};

export default TeamDetails;