import React from "react";
import { Container } from "react-bootstrap";

const UserPendingRequest = () => {
  return (
    <>
      <Container>
        <div className="mb-3">
          <h4 className="font-bold mb-3">Pending Request List</h4>
        </div>

        <div className="p-3 bg-slate-100 rounded-lg">
          <div className="w-full bg-white rounded-lg px-4 py-3 flex justify-between items-center mb-3">
            <div className="flex items-center gap-16">
              <div>
                <h5 className="font-bold">Team Name</h5>
                <p className="-mb-0">Team Category</p>
              </div>
              <div>
                <h4 className="font-bold">User Role</h4>
              </div>
            </div>
            <div className="sm:flex items-center justify-content-between sm:gap-5">
              <button
                type="submit"
                className="rounded bg-red-600 text-white "
                onClick={() => {}}
              >
                Reject
              </button>
              <button
                type="submit"
                className="rounded bg-blue-600 text-white "
                onClick={() => {}}
              >
                Accept
              </button>
            </div>
          </div>

          <div className="w-full bg-white rounded-lg px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-16">
              <div>
                <h5 className="font-bold">Team Name</h5>
                <p className="-mb-0">Team Category</p>
              </div>
              <div>
                <h4 className="font-bold">User Role</h4>
              </div>
            </div>
            <div className="sm:flex items-center justify-content-between sm:gap-5">
              <button
                type="submit"
                className="rounded bg-red-600 text-white "
                onClick={() => {}}
              >
                Reject
              </button>
              <button
                type="submit"
                className="rounded bg-blue-600 text-white "
                onClick={() => {}}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default UserPendingRequest;
