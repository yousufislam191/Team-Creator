import React from "react";
import {
  Button,
  Card,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AccountCircle, EmailRounded, LockRounded } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "../styles/signin.module.css";
import PreviewSignupImage from "../components/PreviewSignupImage";

import apiHostName from "../config/index.js";

const SignUp = () => {
  const navigate = useNavigate();

  const userSchema = Yup.object({
    // image: Yup.mixed()
    //   .required("Image is required")
    //   .test(
    //     "FILE_TYPE",
    //     "Invalid image",
    //     (value) =>
    //       value &&
    //       [
    //         "image/jpg",
    //         "image/jpeg",
    //         "image/png",
    //         "image/gif",
    //         "image/heic",
    //         "image/HEIC",
    //       ].includes(value.type)
    //   ),
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name is too short. Must be at least 3 characters long")
      .max(50, "Name is too long!"),
    email: Yup.string()
      .required("Email address is required")
      .email("Invalid email address"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password is not secure. Must be at least 8 characters long")
      .matches(/[a-z]+/, "Must have one lowercase character")
      .matches(/[A-Z]+/, "Must have one uppercase character")
      .matches(/[@$!%*#?&]+/, "Must have one special character")
      .matches(/\d+/, "Must have one number"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf(
        [Yup.ref("password"), null],
        "Password & confirm password does not match"
      ),
  });

  const formik = useFormik({
    initialValues: {
      // image: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values, helpers) => {
      // console.log(values);
      const res = await axios
        .post(`${apiHostName}/user/register`, {
          name: values.name,
          email: values.email,
          password: values.password,
        })
        .catch((err) => {
          notify(err.response.status, err.response.data.errors.email.msg);
          //   console.log(err);
        });
      if (res) {
        notify(res.status, res.data.message);
      }
    },
    validationSchema: userSchema,
  });
  const notify = (status, message) =>
    status === 200
      ? toast.success(message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      : toast.error(message, {
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
    <div className={style.root}>
      <ToastContainer />
      <Card className={`${style.form} "ms-auto me-auto"`}>
        <Typography className="text-center mb-2" variant="h4" color="primary">
          Registration
        </Typography>
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
          {/* <div className="text-center mb-3 d-flex justify-content-center align-items-center">
            {formik.values.image ? (
              <PreviewSignupImage file={formik.values.image} />
            ) : (
              <img
                src="https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=740"
                className="rounded-circle img-fluid me-3"
                name="image"
                alt="loading..."
                style={{ height: "150px", width: "150px" }}
              />
            )}
            <input
              required
              // hidden
              type="file"
              name="image"
              accept=".jpg, .jpeg, .png, .gif, .heic, .HEIC"
              onChange={(e) => {
                formik.setFieldValue("image", e.target.files[0]);
                formik.handleChange;
              }}
            ></input>
            {formik.errors.image && (
              <p style={{ color: "red", fontSize: "13px", fontWeight: "500" }}>
                {formik.errors.image}
              </p>
            )}
          </div> */}
          <TextField
            fullWidth
            required
            className="mb-3"
            name="name"
            type="text"
            variant="outlined"
            label="Name"
            autoComplete="on"
            error={formik.errors.name}
            onChange={formik.handleChange}
            helperText={formik.errors.name}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            required
            className="mb-3"
            name="email"
            type="email"
            variant="outlined"
            label="Email"
            autoComplete="on"
            error={formik.errors.email}
            onChange={formik.handleChange}
            helperText={formik.errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailRounded color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            required
            className="mb-3"
            name="password"
            type="text"
            variant="outlined"
            label="Password"
            error={formik.errors.password}
            onChange={formik.handleChange}
            helperText={formik.errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockRounded color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            required
            className="mb-4"
            name="confirmPassword"
            type="text"
            variant="outlined"
            label="Confirm Password"
            error={formik.errors.confirmPassword}
            onChange={formik.handleChange}
            helperText={formik.errors.confirmPassword}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockRounded color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <Button fullWidth variant="contained" color="primary" type="submit">
            Sign Up
          </Button>
        </form>
        <div className="text-center">
          <Typography variant="overline">Have an account ?</Typography>
          <Button
            color="primary"
            disableElevation
            onClick={() => {
              navigate("/signin");
            }}
            style={{ backgroundColor: "transparent", textAlign: "left" }}
          >
            Sign in
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;
