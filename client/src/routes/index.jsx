import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import NotFoundPage from "../pages/notFound";
import SignIn from "../pages/signin";
import SignUp from "../pages/signup";
import Dashboard from "../pages/dashboard";
import TeamDetails from "../pages/teamDetails";
import NavigationBar from "../components/Navbar";

const RouterPath = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/dashboard/:id" element={<TeamDetails />} />
          <Route exact path="*" element={<NotFoundPage />} />

          {/* <Route>
            <div className="container">
              <NavigationBar />
              <Routes>
                
              </Routes>
            </div>
          </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RouterPath;
