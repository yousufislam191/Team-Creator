import { React, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, NavDropdown } from "react-bootstrap";
import Loading from "../components/Loading";
import Admin from "../components/Admin";
import User from "../components/User";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

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
      // console.log(data);
      return data;
    }
  };

  useEffect(() => {
    const u_id = JSON.parse(localStorage.getItem("u_id"));
    if (u_id) {
      // const timer = setTimeout(() => {
      sendRequest(u_id);
      setLoading(false);
      // }, 50000);
      // console.log(u_id);
      // console.log(state);
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
        <Loading />
      ) : (
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>
              {user?.role === 1 ? "Admin Dashboard" : "Dashboard"}
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <NavDropdown
                title={user?.name}
                id="basic-nav-dropdown"
                className="text-white"
              >
                <NavDropdown.Item>Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Button
                    variant="light"
                    style={{ width: "100%" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </NavDropdown.Item>
              </NavDropdown>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
      {user?.role === 1 ? <Admin /> : <User />}
    </>
  );
};

export default Dashboard;