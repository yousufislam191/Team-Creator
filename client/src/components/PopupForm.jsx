import React from "react";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import axios from "axios";

const PopupForm = ({ visible, onClose, onTeamName }) => {
  if (!visible) return null;
  const handleClose = (e) => {
    if (e.target.id === "container") onClose();
  };

  const userSchema = Yup.object({
    teamName: Yup.string()
      .required("Team Name is required")
      .min(3, "Team Name must be at least 3 characters"),
  });
  const formik = useFormik({
    initialValues: {
      teamName: "",
    },
    onSubmit: async (values, helpers) => {
      // console.log(values);
      const res = await axios
        .post("http://localhost:6001/api/team/checkTeamName", {
          teamName: values.teamName,
        })
        .catch((err) => {
          notify(err.response.status, err.response.data.message);
          // console.log(err);
        });
      if (res.status === 200) {
        // console.log(res.status);
        onTeamName(values);
      }
    },
    validationSchema: userSchema,
  });

  const notify = (status, message) =>
    status === 400 &&
    toast.error(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  return (
    <>
      <ToastContainer />
      <div
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
        onClick={handleClose}
        id="container"
      >
        <div className="bg-white px-4 py-3 rounded md:w-2/5">
          <h1 className="font-semibold text-xl text-gray-700">
            Create a new team
          </h1>

          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col">
              <p className="-mb-0">Team Name</p>
              <input
                type="text"
                name="teamName"
                onChange={formik.handleChange}
                className="border border-indigo-500/100 p-2 rounded mb-3"
                placeholder="write your team name"
              />
              {formik.errors.teamName && (
                <p className="text-red-600 -mt-4 text-sm">
                  {formik.errors.teamName}
                </p>
              )}
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

export default PopupForm;
