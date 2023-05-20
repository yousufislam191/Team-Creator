import React, { useState } from "react";
import { Container } from "react-bootstrap";
import UserPendingRequest from "./UserPendingRequest";

const User = () => {
  const [showPendingRquest, setShowPendingRquest] = useState(false);

  const pendingRquest = () => {
    setShowPendingRquest(true);
  };

  return (
    <>
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
              Pending Request (0)
            </button>
          )}
        </div>

        {showPendingRquest ? (
          <UserPendingRequest />
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
    </>
  );
};

export default User;
