import React, { useContext, useState, useEffect } from "react";
import httpService from "../services/httpService";
import UserContext from "../context/userContext";
import Loader from "./loader";
import Message from "./message";
import { Button, Table } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';

function OrdersList(props) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { logout } = useContext(UserContext);

  useEffect(() => {
    const fecthOrders = async () => {
      try {
        const { data } = await httpService.get("/api/orders/");
        setOrders(data);
      } catch (ex) {
        if (ex.response && ex.response.status == 403) logout();
        setError(ex.message);
      }
      setLoading(false);
    };
    fecthOrders();
  });

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>₹{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                    <LinkContainer to={`/orders/${order.id}/`}>
                        <Button className="btn-sm btn-light">Details</Button>
                    </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default OrdersList;
