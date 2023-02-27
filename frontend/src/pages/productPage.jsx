import React, { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import Rating from "../components/rating";
import ProductsContext from "../context/productsContext";
import Loader from "../components/loader";
import Message from "../components/message";
import CartContext from "../context/cartContext";

function ProductPage(props) {
  const { id } = useParams();
  const { error, loadProduct } = useContext(ProductsContext);
  const { addItemToCart } = useContext(CartContext);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setProduct(await loadProduct(id));
      setLoading(false);
    };
    fetchData();
  }, []);

  const addToCartHandler = () => {
    addItemToCart(Number(id), Number(qty));
    navigate(`/cart`);
  };

  if (loading) return <Loader />;

  if (error != "")
    return (
      <Message variant="danger">
        <h4>{error}</h4>
      </Message>
    );

  if (product && product.id)
    return (
      <div>
        <Link to="/" className="btn btn-light my-3">
          Go back
        </Link>
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={6} lg={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  color={"#f8e825"}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={12} lg={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status</Col>
                    <Col>
                      {product.countInStock > 0 ? "In stock" : "Out of stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantity</Col>
                      <Col xs="auto" className="my-1">
                        <Form.Select
                          value={qty}
                          onChange={({ currentTarget }) => {
                            setQty(currentTarget.value);
                          }}
                        >
                          {[
                            ...Array(
                              product.countInStock <= 10
                                ? product.countInStock
                                : 10
                            ).keys(),
                          ].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Row className="px-2">
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      disabled={product.countInStock === 0}
                      type="button"
                    >
                      Add to Cart
                    </Button>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </div>
    );

  return <h4>No such product found.</h4>;
}

export default ProductPage;
