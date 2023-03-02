import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Message from "../components/message";
import UserContext from "../context/userContext";
import FormContainer from "../components/formContainer";

function RegisterPage(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userInfo, register, error } = useContext(UserContext);
  const navigate = useNavigate();
  const redirect = window.location.search
    ? window.location.search.split("=")[1]
    : "/";

  if (redirect[0] !== "/") redirect = `/${redirect}`;

  useEffect(() => {
    if (userInfo && userInfo.username) navigate(redirect);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const status = await register(username, email, password);
    if (status) navigate(redirect);
  };

  return (
    <FormContainer>
      <h1>Register</h1>
      {error.register && error.register.detail && (
        <Message variant="danger">
          <h4>{error.register.detail}</h4>
        </Message>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username" className="my-2">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => {
              setUsername(e.currentTarget.value);
            }}
          ></Form.Control>
          <Form.Text>
            {error.register && error.register.username && (
              <Message variant="danger">{error.register.username}</Message>
            )}
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="email" className="my-2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => {
              setEmail(e.currentTarget.value);
            }}
          ></Form.Control>
          <Form.Text>
            {error.register && error.register.email && (
              <Message variant="danger">{error.register.email}</Message>
            )}
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="password" className="my-2">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
          ></Form.Control>
          <Form.Text>
            {error.register && error.register.password && (
              <Message variant="danger">{error.register.password}</Message>
            )}
          </Form.Text>
        </Form.Group>
        <Button type="submit" variant="primary" className="my-2">
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Already Registered?
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default RegisterPage;
