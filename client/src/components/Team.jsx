import React from "react";
import { useNavigate } from "react-router-dom";

const Team = (props) => {
  const navigate = useNavigate();
  const { teamName, teamCategory, _id } = props.team;
  return (
    <>
      <div className="px-5 py-3 rounded hover:bg-slate-100 hover:transition ease-out delay-100 flex justify-between items-center">
        <div className="text-base font-bold">{teamName}</div>
        <div className="text-base font-medium">{teamCategory}</div>
        <button
          type="submit"
          className="rounded text-white bg-blue-700 px-4"
          onClick={() => {
            console.log(_id);
            navigate(`/dashboard/${_id}`);
          }}
        >
          Visit
        </button>
      </div>
    </>
  );
};

export default Team;
