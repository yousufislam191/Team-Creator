import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const PopupFormThird = ({ visible, onClose, onAddMember }) => {
  if (!visible) return null;
  const handleClose = (e) => {
    if (e.target.id === "container") onClose();
  };

  const userSchema = Yup.object({
    userEmail: Yup.string()
      .required("User email address is required")
      .email("Invalid email address"),
    userRole: Yup.string()
      .required("User role is required")
      .min(3, "User Role must be at least 3 characters"),
  });
  const formik = useFormik({
    initialValues: {
      userEmail: "",
      userRole: ",",
    },
    onSubmit: async (values, helpers) => {
      console.log(values);
      //   const res = await axios
      //     .post("http://localhost:6001/api/team/checkuserEmail", {
      //       userEmail: values.userEmail,
      //     })
      //     .catch((err) => {
      //       //   notify(err.response.status, err.response.data.message);
      //       console.log(err);
      //     });
      //   if (res.status === 200) {
      //     // console.log(res.status);
      //     onAddMember(values);
      //   }
    },
    validationSchema: userSchema,
  });

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

          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col">
              <p className="mb-2 text-slate-400">
                Add new member to join group
              </p>
              <input
                type="email"
                name="userEmail"
                onChange={formik.handleChange}
                className="border border-indigo-500/100 p-2 rounded mb-3"
                placeholder="Type a email to assign group member"
              />
              {formik.errors.userEmail && (
                <p className="text-red-600 -mt-4 text-sm">
                  {formik.errors.userEmail}
                </p>
              )}
              {/* <div className="rounded px-3 py-2 mb-3 align-middle bg-slate-100">
                <p className="font-bold">Muhammad Julfikar Ali</p>
                <p className="-mt-4 -mb-0">ui.jali@gmail.com</p>
              </div> */}
              <input
                type="text"
                name="userRole"
                onChange={formik.handleChange}
                className="border border-indigo-500/100 p-2 rounded mb-3"
                placeholder="Assign user role for this group"
              />
              {formik.errors.userRole && (
                <p className="text-red-600 -mt-4 text-sm">
                  {formik.errors.userRole}
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

export default PopupFormThird;
