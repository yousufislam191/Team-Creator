import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import apiHostName from "../config/index.js";

const UserPendingRequest = ({ userId, userPendingData }) => {
  const [userRole, setUserRole] = useState();
  const [userObjectId, setUserObjectId] = useState();
  // const [memberData, setMemberData] = useState();

  const getPendingRequest = async (u_id) => {
    const res = await axios
      .get(`${apiHostName}/team/user-pending-request/${u_id}`)
      .catch((err) => {
        console.log(err);
        // return notify(err.response.status, err.response.data.message);
      });
    if (res) {
      const data = await res.data.result;
      setuserPendingData(data);
      // if (data.status === 201) {
      //   setShow(false);
      // }
      // return notify(data.status, data.data.message);
      // console.log(res.data.result);
    }
  };

  const setMemberData = (memberData) => {
    console.log(memberData.userId === userId);
    // memberData.map((member) => {
    //   // if (member.userId === userId) {
    //   //   // console.log(memberData._id);
    //   //   return;
    //   // }
    //   setUserRole(member.userRole);
    //   setUserObjectId(member._id);
    // });
  };

  useEffect(() => {
    // const u_id = JSON.parse(localStorage.getItem("u_id"));
    // console.log(u_id);
    // getPendingRequest(u_id);
    console.log(userId, userPendingData);
  }, []);

  return (
    <>
      <Container>
        <div className="mb-3">
          <h4 className="font-bold mb-3">Pending Request List</h4>
        </div>

        <div className="p-3 bg-slate-100 rounded-lg">
          {userPendingData?.map((data) => (
            // {
            // console.log(data);
            <div
              key={data?._id}
              className="w-full bg-white rounded-lg px-4 py-3 flex justify-between items-center mb-3"
            >
              {setMemberData(data?.members)}
              <div className="flex items-center gap-16">
                <div>
                  <h5 className="font-bold">{data?.teamName}</h5>
                  <p className="-mb-0">{data?.teamCategory}</p>
                </div>
                <div className="h-14 min-h-[1em] w-0.5 self-stretch bg-neutral-400 opacity-100 dark:opacity-50"></div>
                {/* {data?.members.map((memberData) => {
                  console.log(memberData);
                  // if (memberData.userId === userId) {
                  //   console.log(memberData._id);
                  //   setUserRole(memberData.userRole);
                  //   setUserObjectId(memberData._id);
                  //   // <div>
                  //   //   <h4 className="font-bold">{memberData?.userRole}</h4>
                  //   // </div>;
                  // }
                  memberData.userId === userId
                    ? setUserRole(memberData.userRole)
                    : memberData.userId === userId
                    ? setUserObjectId(memberData._id)
                    : null;
                })} */}
                <div>
                  <h4 className="font-bold">{userRole}</h4>
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
            // }
          ))}
        </div>
      </Container>
    </>
  );
};

export default UserPendingRequest;
