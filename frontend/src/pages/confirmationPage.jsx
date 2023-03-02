import React, { useEffect, useState } from "react";
import Loader from "../components/loader";
import Message from "../components/message";
import httpService from "../services/httpService";
import { Button } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import { useSearchParams } from 'react-router-dom';

function ConfirmationPage(props) {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [queryParams,] = useSearchParams()
  const id = queryParams.get("id");
  const payment_intent = (new URLSearchParams(window.location.search)).get("payment_intent");
  const success = queryParams.get("success");
  console.log(id,payment_intent,success)

  useEffect(() => {
    if (!success) {
      setError("Payment was not successful!");
      setLoading(false);
      return;
    }

    if (!id || !payment_intent) {
      setError("Parameters not passed currectly!");
      setLoading(false);
      return;
    }

    const fetchPaymentStatus = async () => {
      try {
        const { data } = await httpService.post(`/api/orders/${id}/pay/`, {
          payment_intent,
        });
        setMessage(data);
      } catch (ex) {
        console.log(ex);
      }
      setLoading(false);
    };

    fetchPaymentStatus();
  });

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Message variant="info">{message}</Message>
          )}
          <LinkContainer to={`/orders/${id}`}>
            <Button variant="primary">Track Order</Button>
          </LinkContainer>
        </div>
      )}
    </div>
  );
}

export default ConfirmationPage;
