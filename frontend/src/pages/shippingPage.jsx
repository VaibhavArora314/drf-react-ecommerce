import React, { useState, useContext, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/userContext";
import FormContainer from "../components/formContainer";
import CartContext from "../context/cartContext";
import CheckoutSteps from "../components/checkoutSteps";

function ShippingPage(props) {
  const { userInfo } = useContext(UserContext);
  const { shippingAddress, updateShippingAddress } = useContext(CartContext);
  const [address, setAddress] = useState(
    shippingAddress && shippingAddress.address ? shippingAddress.address : ""
  );
  const [city, setCity] = useState(
    shippingAddress && shippingAddress.city ? shippingAddress.city : ""
  );
  const [postalCode, setPostalCode] = useState(
    shippingAddress && shippingAddress.postalCode
      ? shippingAddress.postalCode
      : ""
  );
  const [country, setCountry] = useState(
    shippingAddress && shippingAddress.country ? shippingAddress.country : ""
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo == null || !userInfo.username) navigate("/");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateShippingAddress(address, city, postalCode, country);
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping Address</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="address" className="my-2">
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => {
              setAddress(e.currentTarget.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city" className="my-2">
          <Form.Label>City</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => {
              setCity(e.currentTarget.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode" className="my-2">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Postal Code"
            value={postalCode}
            onChange={(e) => {
              setPostalCode(e.currentTarget.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="Country" className="my-2">
          <Form.Label>Country</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Country"
            value={country}
            onChange={(e) => {
              setCountry(e.currentTarget.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="my-2">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ShippingPage;
