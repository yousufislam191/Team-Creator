import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Card,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  EmailRounded,
  LockRounded,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import style from "../styles/signin.module.css";

import apiHostName from "../config/index.js";

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const userSchema = Yup.object({
    email: Yup.string()
      .required("Email address is required")
      .email("Invalid email address"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, helpers) => {
      //   console.log(values);
      const res = await axios
        .post(`${apiHostName}/user/signin`, {
          email: values.email,
          password: values.password,
        })
        .catch((err) => {
          notify(err.response.status, err.response.data.message);
          console.log(err);
        });
      if (res) {
        // console.log(res.data.user);
        localStorage.setItem("u_id", JSON.stringify(res.data.user._id));
        const userInfo = res.data.user;
        notify(res.status, res.data.message);
        navigate("/dashboard", {
          state: {
            userInfo,
          },
        });
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

  useEffect(() => {
    const u_id = JSON.parse(localStorage.getItem("u_id"));
    if (u_id) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className={style.root}>
      <ToastContainer />
      <Card className={`${style.form} "ms-auto me-auto"`}>
        <Typography className="text-center mb-3" variant="h4" color="primary">
          Login
        </Typography>
        <form onSubmit={formik.handleSubmit}>
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
            className="mb-2"
            name="password"
            type={showPassword ? "text" : "password"}
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
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? (
                      <Visibility color="primary" />
                    ) : (
                      <VisibilityOff color="primary" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button fullWidth variant="contained" color="primary" type="submit">
            Sign in
          </Button>
        </form>
        <div className="text-center">
          <Typography variant="overline">Don't have an account ?</Typography>
          <Button
            color="primary"
            disableElevation
            onClick={() => {
              navigate("/signup");
            }}
            style={{ backgroundColor: "transparent", textAlign: "left" }}
          >
            Sign up
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SignIn;
