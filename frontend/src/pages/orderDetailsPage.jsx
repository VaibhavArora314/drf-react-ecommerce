import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import httpService from "../services/httpService";
import UserContext from "../context/userContext";
import Loader from "../components/loader";
import Message from "../components/message";
import StripePaymentWrapper from "../components/stripePaymentWrapper";

function OrderDetailsPage(props) {
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState({});
  const [error, setError] = useState("");
  const { userInfo, logout } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();

  if (!userInfo || !userInfo.username) navigate("/login");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await httpService.get(`/api/orders/${id}/`);
        setOrderDetails(data);
      } catch (ex) {
        if (ex.response && ex.response.status == 403) logout();
        if (ex.response && ex.response.status == 404)
          setError("No such order exists for this user!");
        else setError(ex.message);
      }
      setLoading(false);
    };
    fetchOrder();
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error != "" ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <strong>Name: </strong> {orderDetails.user.username}
                </p>
                <p>
                  <strong>Email: </strong>{" "}
                  <Link href={`mailto:${orderDetails.user.email}`}>
                    {orderDetails.user.email}
                  </Link>
                </p>
                <p>
                  <strong>Shipping: </strong>
                  {orderDetails.shippingAddress.address},{" "}
                  {orderDetails.shippingAddress.city},{"   "}
                  {orderDetails.shippingAddress.postalCode},{"   "}
                  {orderDetails.shippingAddress.country}
                </p>
                <p>
                  {orderDetails.isDelivered ? (
                    <Message variant="success">
                      Delivered at {orderDetails.deliveredAt}.
                    </Message>
                  ) : (
                    <Message variant="warning">Not Delivered!</Message>
                  )}
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                  <strong>Method: </strong>
                  {orderDetails.paymentMethod}
                </p>
                <p>
                  {orderDetails.isPaid ? (
                    <Message variant="success">
                      Paid at {orderDetails.paidAt}.
                    </Message>
                  ) : (
                    <Message variant="warning">Not Paid!</Message>
                  )}
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Order Items</h2>
                {
                  <ListGroup variant="flush">
                    {orderDetails.orderItems.map((product) => (
                      <ListGroup.Item key={product.id}>
                        <Row>
                          <Col sm={3} md={2}>
                            <Image
                              src={product.image}
                              alt={product.productName}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col sm={5} md={6}>
                            <Link
                              to={`/product/${product.id}`}
                              className="text-decoration-none"
                            >
                              {product.productName}
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
                }
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
                    <Col>
                      ₹
                      {orderDetails.totalPrice -
                        orderDetails.taxPrice -
                        orderDetails.shippingPrice}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>₹{orderDetails.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>₹{orderDetails.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>₹{orderDetails.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
            <Row className="p-2">
              {!orderDetails.isPaid && (
                <StripePaymentWrapper id={orderDetails.id} />
              )}
            </Row>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default OrderDetailsPage;
