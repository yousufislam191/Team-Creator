import React, { useEffect, useState } from "react";
import axios from "axios";

const PopupFormThird = ({ visible, onClose, onAddMember }) => {
  if (!visible) return null;
  const handleClose = (e) => {
    if (e.target.id === "container") onClose();
  };

  const [getName, setGetName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [addName, setAddName] = useState();
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId != "" && userRole != "") {
      // console.log(userId, userRole);
      onAddMember([userId, userRole]);
    } else {
      alert("please fillup the name and role field");
    }
  };

  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:6001/api/user/search-user-name", {
        name: getName,
      })
      .catch((err) => {
        console.log(err);
      });
    if (res) {
      // console.log(res.data.user);
      setAddName(res.data.user);
    }
  };

  useEffect(() => {
    sendRequest();
  }, [getName]);

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
        onClick={handleClose}
        id="container"
      >
        <div className="bg-white px-4 py-3 rounded md:w-2/5">
          <h1 className="font-semibold text-xl text-gray-700">
            Who do you want to add new members?
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <p className="mb-2 text-slate-400">
                Add new member to join group
              </p>
              <input
                type="text"
                name="userName"
                onChange={(e) => setGetName(e.target.value)}
                value={userName}
                className="border border-indigo-500/100 p-2 rounded mb-3"
                placeholder="Type user name to assign group member"
              />
              <div className="max-h-32 overflow-auto mb-3">
                {addName?.map((value) => (
                  <div
                    key={value._id}
                    className="rounded px-3 py-2 mb-3 align-middle bg-slate-100 cursor-pointer"
                    onClick={() => {
                      setUserId(value._id);
                      setUserName(value.name);
                    }}
                  >
                    <p className="font-bold">{value.name}</p>
                    <p className="-mt-4 -mb-0">{value.email}</p>
                  </div>
                ))}
              </div>
              <input
                type="text"
                name="userRole"
                onChange={(e) => setUserRole(e.target.value)}
                value={userRole}
                className="border border-indigo-500/100 p-2 rounded mb-3"
                placeholder="Assign user role for this group"
              />
            </div>
            <div className="text-center flex justify-between items-center">
              <button
                className="px-5 py-2 bg-white text-black rounded border-black"
                onClick={handleClose}
                id="container"
              >
                Cancel
              </button>
              <button
                className="px-5 py-2 bg-blue-700 text-white rounded"
                type="submit"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PopupFormThird;
