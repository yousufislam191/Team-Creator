import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const PopupFormSecond = ({ visible, onClose, onTeamCategory }) => {
  if (!visible) return null;
  const handleClose = (e) => {
    if (e.target.id === "container") onClose();
  };

  const userSchema = Yup.object({
    teamCategory: Yup.string()
      .required("Team Category is required")
      .min(3, "Team Name must be at least 3 characters"),
  });
  const formik = useFormik({
    initialValues: {
      teamCategory: "",
    },
    onSubmit: (values) => {
      // console.log(values);
      onTeamCategory(values);
    },
    validationSchema: userSchema,
  });

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      onClick={handleClose}
      id="container"
    >
      <div className="bg-white px-4 py-3 rounded md:w-2/5">
        <h1 className="font-semibold text-xl text-gray-700">Team Category</h1>

        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col">
            <p className="-mb-0">Team Title</p>
            <input
              type="text"
              name="teamCategory"
              onChange={formik.handleChange}
              className="border border-indigo-500/100 p-2 rounded mb-3"
              placeholder="Graphics Design Team"
            />
            {formik.errors.teamCategory && (
              <p className="text-red-600 -mt-4 text-sm">
                {formik.errors.teamCategory}
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
  );
};

export default PopupFormSecond;
