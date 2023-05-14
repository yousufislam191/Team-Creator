import { React, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Button, Card, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  const sendRequest = async (u_id) => {
    // console.log(`localStorage id: ${u_id}`);
    const res = await axios
      .post("http://localhost:6001/api/user/fetchUser", {
        u_id: u_id,
      })
      .catch((err) => {
        console.log(err);
        return notify(err.response.status, err.response.data.message);
      });
    if (res) {
      const data = await res.data;
      setUser(data.user);
      console.log(data);
      return data;
    }
  };

  useEffect(() => {
    const u_id = JSON.parse(localStorage.getItem("u_id"));
    if (u_id) {
      sendRequest(u_id);
      // console.log(u_id);
      // console.log(state);
    } else {
      navigate("/");
    }
  }, []);

  const notify = (status, message) => {
    if (status !== 200) {
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
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("u_id");
    navigate("/");
  };

  return (
    <>
      <ToastContainer />
      {user && (
        <div className="root">
          <Typography
            className="text-center mb-3 mt-3"
            variant="h4"
            color="primary"
          >
            Welcome to Dashboard
          </Typography>
          <Card className="form ms-auto me-auto">
            <h2>Name: {user.name}</h2>
            <h4>Email: {user.email}</h4>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Card>
        </div>
      )}
    </>
  );
};

export default Dashboard;
