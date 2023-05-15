import React from "react";

const TeamList = () => {
  return (
    <div className="px-5 py-3 rounded border-2 border-blue-700 flex justify-between items-center">
      <div className="text-base font-medium">Team Name</div>
      <div className="text-base font-medium">Team Category</div>
      <div className="text-base font-medium">Status</div>
    </div>
  );
};

export default TeamList;
