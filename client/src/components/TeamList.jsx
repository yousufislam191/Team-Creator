import axios from "axios";
import React, { useEffect, useState } from "react";
import Team from "./Team";

import apiHostName from "../config/index.js";

const TeamList = () => {
  const [teamList, setTeamList] = useState();
  const sendRequest = async () => {
    // console.log(`localStorage id: ${u_id}`);
    const res = await axios
      .get(`${apiHostName}/team/fetchTeam`)
      .catch((err) => {
        console.log(err);
        // return notify(err.response.status, err.response.data.message);
      });
    if (res) {
      const data = await res.data;
      setTeamList(data.teamlist);
      // console.log(data);
    }
  };

  useEffect(() => {
    const interval = setInterval(sendRequest, 3000); // Every 3 seconds?
    sendRequest(); // Initial request
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="px-5 py-3 mb-3 rounded border-2 border-blue-700 flex justify-between items-center">
        <div className="text-base font-medium">Team Name</div>
        <div className="text-base font-medium">Team Category</div>
        <div className="text-base font-medium">Status</div>
      </div>
      {teamList?.map((team) => (
        <Team team={team} key={team._id} />
      ))}
    </>
  );
};

export default TeamList;
