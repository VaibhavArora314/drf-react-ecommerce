import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/loader";
import Message from "../components/message";
import UserContext from "../context/userContext";
import FormContainer from "../components/formContainer";

function LoginPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { userInfo, login, error } = useContext(UserContext);
  const navigate = useNavigate();
  const redirect = window.location.search
    ? "/" + window.location.search.split("=")[1]
    : "/";

  useEffect(() => {
    if (userInfo && userInfo.username) navigate(redirect);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const status = await login(username, password);
    if (status) navigate(redirect);
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error.login && error.login.detail && (
        <Message variant="danger">
          <h4>{error.login.detail}</h4>
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
          <Form.Text>
            {error.login && error.login.username && (
              <Message variant="danger">{error.login.username}</Message>
            )}
          </Form.Text>
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
          <Form.Text>
            {error.login && error.login.password && (
              <Message variant="danger">{error.login.password}</Message>
            )}
          </Form.Text>
        </Form.Group>
        <Button type="submit" variant="primary" className="my-2">
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginPage;
