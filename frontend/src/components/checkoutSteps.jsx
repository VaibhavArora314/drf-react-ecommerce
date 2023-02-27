import React from "react";
import { Nav, ProgressBar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (
    <div>
      <ProgressBar
        variant="primary"
        now={step4 ? 80 : step3 ? 60 : step2 ? 40 : step1 ? 20 : 0}
        className="my-2"
      />
      <Nav className="justify-content-center mb-4">
        <Nav.Item>
          {step1 ? (
            <LinkContainer to="/login">
              <Nav.Link>1. Login</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>1. Login</Nav.Link>
          )}
        </Nav.Item>
        <Nav.Item>
          {step2 ? (
            <LinkContainer to="/shipping">
              <Nav.Link>2. Shipping</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>2. Shipping</Nav.Link>
          )}
        </Nav.Item>
        <Nav.Item>
          {step3 ? (
            <LinkContainer to="/payment">
              <Nav.Link>3. Payment</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>3. Payment</Nav.Link>
          )}
        </Nav.Item>
        <Nav.Item>
          {step4 ? (
            <LinkContainer to="/placeorder">
              <Nav.Link>4. Place Order</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>4. Place Order</Nav.Link>
          )}
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default CheckoutSteps;
