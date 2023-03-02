import React, { useContext, useState, useEffect } from "react";
import UserContext from "../context/userContext";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader";

function Logout(props) {
  const { userInfo, logout } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && userInfo.username) logout();
    setLoading(false);
    navigate("/login");
  }, []);

  if (loading) return <Loader />;
}

export default Logout;
