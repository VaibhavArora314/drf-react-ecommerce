import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/message";
import CartContext from "../context/cartContext";

function CartPage(props) {
  const { error, productsInCart, updateItemQty, removeFromCart } =
    useContext(CartContext);

  const navigate = useNavigate();

  const handleCheckOut = () => {
    navigate("/login?redirect=shipping");
  };

  if (error != "")
    return (
      <Message variant="danger">
        <h4>{error}</h4>
      </Message>
    );

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {productsInCart.length === 0 ? (
          <Message variant="info">
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {productsInCart.map((product) => (
              <ListGroup.Item key={product.id}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col xs={9} md={3}>
                    <Link
                      to={`/products/${product.id}`}
                      className="text-decoration-none"
                    >
                      {product.name}
                    </Link>
                  </Col>
                  <Col xs={3} md={2}>
                    ${product.price}
                  </Col>
                  <Col xs={6} md={3}>
                    <Form.Select
                      value={product.qty}
                      onChange={(e) => {
                        updateItemQty(
                          product.id,
                          Number(e.currentTarget.value)
                        );
                      }}
                    >
                      {[
                        ...Array(
                          product.countInStock <= 10 ? product.countInStock : 10
                        ).keys(),
                      ].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col className="ms-auto" xs={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => {
                        removeFromCart(product.id);
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal
                {productsInCart.reduce((acc, product) => acc + product.qty, 0)}
                items
              </h2>
              <h4>
                $
                {productsInCart
                  .reduce(
                    (acc, product) => acc + product.qty * product.price,
                    0
                  )
                  .toFixed(2)}
              </h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row className="px-2">
                <Button
                  type="button"
                  className="btn-block"
                  disabled={productsInCart.length === 0}
                  onClick={handleCheckOut}
                >
                  Proceed to Checkout
                </Button>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default CartPage;
