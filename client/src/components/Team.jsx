import React from "react";
import { useNavigate } from "react-router-dom";

const Team = (props) => {
  const navigate = useNavigate();
  const { teamName, teamCategory, _id } = props.team;
  return (
    <>
      <div className="px-3 md:px-5 py-3 gap-x-3 rounded bg-slate-100 hover:bg-slate-200 hover:transition ease-out delay-100 flex justify-between items-center">
        <div className="tracking-wide text-left font-bold">{teamName}</div>
        <div className="tracking-wide text-center font-medium">
          {teamCategory}
        </div>
        <button
          type="submit"
          className="rounded text-white bg-blue-700 px-4 tracking-wide text-right"
          onClick={() => {
            // console.log(_id);
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
