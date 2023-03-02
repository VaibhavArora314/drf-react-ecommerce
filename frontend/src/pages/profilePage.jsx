import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Message from "../components/message";
import UserContext from "../context/userContext";
import OrdersList from "../components/ordersList";

function ProfilePage(props) {
  const { userInfo, updateProfile } = useContext(UserContext);
  const [username, setUsername] = useState(
    userInfo && userInfo.username ? userInfo.username : ""
  );
  const [email, setEmail] = useState(
    userInfo && userInfo.email ? userInfo.email : ""
  );
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ show: false, success: false });
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo == null || !userInfo.username) navigate("/");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedStatus = await updateProfile(username, email, password);
    setStatus({ show: true, success: updatedStatus });
  };

  return (
    <Row>
      <Col md={4}>
        <h1>Profile</h1>
        {status.show && status.success && (
          <Message variant="info">
            <h4>Successfully Updated!</h4>
          </Message>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username" className="my-2">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => {
                setUsername(e.currentTarget.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email" className="my-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password" className="my-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary" className="my-2">
            Update Profile
          </Button>
        </Form>
      </Col>
      <Col md={8}>
        <h1>My Orders</h1>
        <OrdersList />
      </Col>
    </Row>
  );
}

export default ProfilePage;
