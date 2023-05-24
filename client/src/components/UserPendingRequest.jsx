import React from "react";
import { Container } from "react-bootstrap";

const UserPendingRequest = ({ userPendingData, onAccept, onReject }) => {
  return (
    <>
      <Container>
        <div className="mb-3">
          <h4 className="font-bold mb-3">Pending Request List</h4>
        </div>

        <div className="p-3 bg-slate-100 rounded-lg">
          {userPendingData?.map((data) => (
            <div
              key={data?._id}
              className="w-full bg-white rounded-lg px-4 py-3 flex justify-between items-center mb-3"
            >
              <div className="flex items-center">
                <div className="mr-3 md:mr-10">
                  <h3 className="font-bold text-lg md:text-3xl">
                    {data?.teamName}
                  </h3>
                  <p className="-mb-0 md:text-xl">{data?.teamCategory}</p>
                </div>
                <div className="h-18 min-h-[1em] w-0.5 self-stretch bg-neutral-400 opacity-100 dark:opacity-50"></div>
                <div className="ml-3 md:ml-10 me-3">
                  <p className="font-semibold md:text-xl">
                    {data?.members[0].userRole}
                  </p>
                </div>
              </div>
              <div className="grid gap-y-3 md:flex items-center justify-content-between md:gap-5">
                <button
                  type="submit"
                  className="rounded bg-red-600 text-white"
                  onClick={() => {
                    onReject(data?.members[0]._id);
                  }}
                >
                  Reject
                </button>
                <button
                  type="submit"
                  className="rounded bg-blue-600 text-white "
                  onClick={() => {
                    onAccept(data?.members[0]._id);
                  }}
                >
                  Accept
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default UserPendingRequest;
