import React, { useContext } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/message";
import CheckoutSteps from "../components/checkoutSteps";
import UserContext from "../context/userContext";
import CartContext from "../context/cartContext";
import FormContainer from "../components/formContainer";

function PlacerOrderPage(props) {
  const { userInfo } = useContext(UserContext);
  const {
    productsInCart,
    shippingAddress,
    paymentMethod,
    totalItemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    placeOrder
  } = useContext(CartContext);
  const navigate = useNavigate();

  if (!userInfo || !userInfo.username) navigate("/login");
  if (!shippingAddress || !shippingAddress.address) navigate("/shipping");

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    const id = await placeOrder();

  };

  return (
    <div>
      <FormContainer>
        <CheckoutSteps step1 step2 step3 step4 />
      </FormContainer>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Shipping: </strong>
                {shippingAddress.address}, {shippingAddress.city},{"   "}
                {shippingAddress.postalCode},{"   "}
                {shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {productsInCart.length == 0 ? (
                <Message variant="info">Your Cart is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {productsInCart.map((product) => (
                    <ListGroup.Item key={product.id}>
                      <Row>
                        <Col sm={3} md={2}>
                          <Image
                            src={product.image}
                            alt={product.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col sm={5} md={6}>
                          <Link
                            to={`/product/${product.id}`}
                            className="text-decoration-none"
                          >
                            {product.name}
                          </Link>
                        </Col>
                        <Col sm={3} md={4}>
                          {product.qty} X ₹{product.price} = ₹
                          {(product.qty * product.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>₹{totalItemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>₹{shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>₹{taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>₹{totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row className="mx-1">
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={productsInCart.length == 0}
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </Button>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>

          {totalItemsPrice <= 2000 ? (
            <Message variant="info">
              Free shipping on minimum item value ₹2000.
            </Message>
          ) : (
            <Message variant="info">Free shipping on this order!</Message>
          )}
          <Message variant="info">
            5% tax is calculated based on item value.
          </Message>
        </Col>
      </Row>
    </div>
  );
}

export default PlacerOrderPage;
