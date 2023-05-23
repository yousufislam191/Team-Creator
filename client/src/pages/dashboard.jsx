import { React, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Admin from "../components/Admin";
import User from "../components/User";
import NavigationBar from "../components/Navbar";

import apiHostName from "../config/index.js";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const sendRequest = async (u_id) => {
    // console.log(`localStorage id: ${u_id}`);
    const res = await axios
      .post(`${apiHostName}/user/fetchUser`, {
        u_id: u_id,
      })
      .catch((err) => {
        console.log(err);
        return notify(err.response.status, err.response.data.message);
      });
    setLoading(true);
    if (res) {
      const data = await res.data;
      setUser(data.user);
      // console.log(data);
      return data;
    }
  };

  useEffect(() => {
    const u_id = JSON.parse(localStorage.getItem("u_id"));
    if (u_id) {
      sendRequest(u_id);
      // setLoading(true);
    } else {
      navigate("/");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("u_id");
    navigate("/");
  };

  return (
    <>
      {loading ? (
        <NavigationBar
          role={user?.role}
          name={user?.name}
          onLogout={handleLogout}
        />
      ) : (
        <Loading />
      )}
      {user?.role === 1 ? <Admin /> : <User />}
    </>
  );
};

export default Dashboard;
