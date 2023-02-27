import React, { useContext } from "react";
import UserContext from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Logout(props) {
  const { userInfo, logout } = useContext(UserContext);
  const navigate = useNavigate();

  if (userInfo && userInfo.username) logout();

    window.location = '/login'
}

export default Logout;
