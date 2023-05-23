import React, { useState } from "react";
import { Navbar, Container, NavDropdown } from "react-bootstrap";

const NavigationBar = ({ role, name, onLogout }) => {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked((prevState) => !prevState);
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" className="w-full">
        <Container>
          <Navbar.Brand>
            {role === 1 ? "Admin Dashboard" : "Dashboard"}
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <NavDropdown
              title={name}
              disabled
              className="text-white cursor-pointer"
              onClick={handleClick}
            ></NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {isClicked ? (
        <div className="absolute z-10 top-10 md:top-12 right-2 sm:right-10 text-left border-2 rounded-lg bg-white w-max md:w-36">
          <button
            type="submit"
            className="px-3 text-blue-600"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      ) : null}
    </>
  );
};

export default NavigationBar;
