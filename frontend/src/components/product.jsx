import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./rating";
import { Link } from "react-router-dom";

function Product({ product }) {
  return (
    <Card className="my-3 p-3 rounded">
      <Link
        to={`/products/${product.id}`}
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <Card.Img src={product.image} />
      </Link>
      <Card.Body>
        <Link
          to={`/products/${product.id}`}
          className="text-decoration-none"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-3">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
              color={"#f8e825"}
            />
          </div>
        </Card.Text>
        <Card.Text as="h3">₹{product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
