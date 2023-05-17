import React from "react";
import { Navbar, Container, NavDropdown } from "react-bootstrap";
import { Button } from "@material-ui/core";

const NavigationBar = ({ role, name, onLogout }) => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            {role === 1 ? "Admin Dashboard" : "Dashboard"}
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <NavDropdown
              title={name}
              id="basic-nav-dropdown"
              className="text-white"
            >
              <NavDropdown.Item>Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Button
                  variant="light"
                  style={{ width: "100%" }}
                  onClick={onLogout}
                >
                  Logout
                </Button>
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
