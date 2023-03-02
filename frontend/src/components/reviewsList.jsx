import React, { useState, useContext } from "react";
import ProductsContext from "../context/productsContext";
import UserContext from "../context/userContext";
import Message from "./message";
import Rating from "./rating";
import httpService from "../services/httpService";
import { Form, ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function ReviewsList({ product }) {
  const [reviews, setReviews] = useState(
    product && product.reviews ? product.reviews : []
  );
  const [rating, setRating] = useState("");
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");
  const { userInfo } = useContext(UserContext);
  const { loadProducts, productsLoaded } = useContext(ProductsContext);

  const createReviewHandler = async (e) => {
    e.preventDefault();
    console.log("Creating a review");
    try {
      const { data } = await httpService.post(
        `/api/products/${product.id}/reviews/`,
        {
          rating: Number(rating),
          comment,
        }
      );

      setReviews([data, ...reviews]);
      if (productsLoaded) loadProducts(true);
    } catch (ex) {
      if (ex.response && ex.response.data && ex.response.data.detail)
        setError(ex.response.data.detail);
      else setError(ex.message);
    }
  };

  return (
    <div>
      <h4>Reviews</h4>
      {reviews.length === 0 && <Message variant="info">No reviews</Message>}
      <ListGroup variant="flush">
        {reviews.map((review) => (
          <ListGroup.Item className="mb-2" key={review.id}>
            <strong>{review.name}</strong>
            <Rating value={review.rating} text={``} color={"#f8e825"} />
            <p>{review.createdAt.substring(0, 10)}</p>
            <p>{review.comment}</p>
          </ListGroup.Item>
        ))}
        <ListGroup.Item>
          <h4>Write a Review</h4>
          {userInfo && userInfo.username ? (
            <Form onSubmit={createReviewHandler}>
              {error && <Message variant="danger">{error}</Message>}
              <Form.Group controlId="rating" className="py-2">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  as="select"
                  value={rating}
                  onChange={(e) => {
                    setRating(e.currentTarget.value);
                  }}
                >
                  <option value="">Select a rating..</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="comment" className="py-2">
                <Form.Label>Review</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="5"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.currentTarget.value);
                  }}
                ></Form.Control>
              </Form.Group>
              <Button
                className="my-2"
                type="submit"
                disabled={rating == "" || comment == ""}
              >
                Submit
              </Button>
            </Form>
          ) : (
            <Message variant="info">
              Please <Link to="/login">Login</Link> to write a review.
            </Message>
          )}
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default ReviewsList;
