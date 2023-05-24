import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { CSpinner } from "@coreui/react";
import UserPendingRequest from "./UserPendingRequest";
import axios from "axios";

import apiHostName from "../config/index.js";
import Loading from "./Loading";

const User = () => {
  const [showPendingRquest, setShowPendingRquest] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState();
  const [userPendingData, setuserPendingData] = useState();

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

  useEffect(() => {
    const u_id = JSON.parse(localStorage.getItem("u_id"));
    // console.log(u_id);
    setUserId(u_id);
    getPendingRequest(u_id);
  }, []);

  return (
    <>
      {loading ? (
        <Container>
          <div className="d-flex justify-content-between align-items-center mt-3 mb-5">
            <h2>Team Creator Management System</h2>
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
              userId={userId}
              userPendingData={userPendingData}
            />
          ) : (
            <div>
              <h4 className="font-bold mb-3">Your Team</h4>
              <div className=" grid md:grid-cols-3 grid-flow-row md:gap-x-24 gap-y-10">
                <div className="rounded-lg border-2 border-blue-600 p-4">
                  <h5 className="font-bold -mb-0">Dark Defender</h5>
                  <h6>UI/UX Designer</h6>
                  <div className="flex justify-between items-center md:gap-32">
                    <p>Developer</p>
                    <button className="rounded-lg border bg-blue-600 text-white px-4">
                      Visit
                    </button>
                  </div>
                </div>
                <div className="rounded-lg border-2 border-blue-600 p-4">
                  <h5 className="font-bold -mb-0">Dark Defender</h5>
                  <h6>UI/UX Designer</h6>
                  <div className="flex justify-between items-center gap-32">
                    <p>Developer</p>
                    <button className="rounded-lg border bg-blue-600 text-white px-4">
                      Visit
                    </button>
                  </div>
                </div>
                <div className="rounded-lg border-2 border-blue-600 p-4">
                  <h5 className="font-bold -mb-0">Dark Defender</h5>
                  <h6>UI/UX Designer</h6>
                  <div className="flex justify-between items-center gap-32">
                    <p>Developer</p>
                    <button className="rounded-lg border bg-blue-600 text-white px-4">
                      Visit
                    </button>
                  </div>
                </div>
                <div className="rounded-lg border-2 border-blue-600 p-4">
                  <h5 className="font-bold -mb-0">Dark Defender</h5>
                  <h6>UI/UX Designer</h6>
                  <div className="flex justify-between items-center gap-32">
                    <p>Developer</p>
                    <button className="rounded-lg border bg-blue-600 text-white px-4">
                      Visit
                    </button>
                  </div>
                </div>
                <div className="rounded-lg border-2 border-blue-600 p-4">
                  <h5 className="font-bold -mb-0">Dark Defender</h5>
                  <h6>UI/UX Designer</h6>
                  <div className="flex justify-between items-center gap-32">
                    <p>Developer</p>
                    <button className="rounded-lg border bg-blue-600 text-white px-4">
                      Visit
                    </button>
                  </div>
                </div>
              </div>
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
