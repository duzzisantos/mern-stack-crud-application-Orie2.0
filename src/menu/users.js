import React from "react";
import { ToolBar1, ToolBar2 } from "../reusable-comps/themes";
import Login from "../menu/login";
import SignUp from "../menu/account";
import { Routes, Route } from "react-router-dom";
const Users = () => {
  return (
    <div className="page-wrapper">
      <div className="users-wrapper">
        <div className="login-signup">
          <div id="users-link-holder">
            <ToolBar1></ToolBar1>
            <ToolBar2></ToolBar2>
            <Routes>
              <Route path="account" element={<SignUp />} />
              <Route path="login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
