import React from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const Card = ({ userActiveTeamData, loading }) => {
  const navigate = useNavigate();
  return (
    <>
      {loading ? (
        userActiveTeamData?.map((data) => (
          <div key={data._id}>
            <div className="rounded-lg border-2 border-blue-600 p-4">
              <h5 className="font-bold -mb-0">{data.teamName}</h5>
              <h6>{data.teamCategory}</h6>
              <div className="flex justify-between items-center xl:gap-32">
                <p className="text-green-700">{data.members[0].userRole}</p>
                <button
                  className="rounded-lg border bg-blue-600 text-white px-4"
                  onClick={() => navigate(`/dashboard/${data._id}`)}
                >
                  Visit
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Card;
