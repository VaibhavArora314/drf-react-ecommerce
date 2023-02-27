import React, { useState, useContext } from "react";
import { Form, Button, Col } from "react-bootstrap";
import FormContainer from "../components/formContainer";
import CheckoutSteps from "../components/checkoutSteps";
import { useNavigate } from "react-router-dom";
import CartContext from "../context/cartContext";

function PaymentPage(props) {
  const { shippingAddress, paymentMethod:method, updatePaymentMethod } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState(method);
  const navigate = useNavigate();

  if (!shippingAddress || !shippingAddress.address) navigate("/shipping");

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePaymentMethod(paymentMethod)
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="paypal"
              name="paymentMethod"
              value="PayPal"
              onChange={(e) => {
                setPaymentMethod(e.currentTarget.value);
              }}
              checked={"PayPal" == paymentMethod}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="Cash on Delivery"
              id="cod"
              name="cod"
              value="Cash on Delivery"
              onChange={(e) => {
                setPaymentMethod(e.currentTarget.value);
              }}
              checked={"Cash on Delivery" == paymentMethod}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentPage;
