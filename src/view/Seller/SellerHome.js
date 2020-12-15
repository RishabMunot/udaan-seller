import { Route, useHistory } from "react-router-dom";
import Auth from "../../model/auth";
import "../../css/App.css";

import React, { useEffect, useState } from "react";
import { Card, CardColumns, Table } from "react-bootstrap";
import products from "../../images/products.png";
import sales from "../../images/sales.png";
import orders_img from "../../images/orders.png";
import SellerNavbar from "./SellerNavbar";
import auth from "../../model/auth";
import Axios from "axios";

export default function SellerHome() {
  var history = useHistory();
  console.log(Auth.getUserData());
  const [noOfOrders, setNoOfOrders] = useState(0)

const [userId, setUserId] = useState(0)
  const [orders, setOrders] = useState([
  ]);

  const fetchMarker = async () => {
    const res = await Axios.get("http://localhost:5000/get-seller-orders", {
      params: { sellerEmail: auth.getUserData().email },
    });
    setOrders(res.data);
    setNoOfOrders(res.data.length)
    console.log("res",res.data);

  };

  useEffect(() => {
    fetchMarker();
  }, [userId]);

  return (
    <div>
      <SellerNavbar /> <br />
      <div className="container">
        <h1 style={{ marginBottom: "1em" }}>DashBoard</h1>

        <CardColumns>
          <Card text="light" bg="dark" style={{ width: "18rem" }}>
            <Card.Img
              style={{ height: "10em", objectFit: "contain" }}
              variant="top"
              src={products}
            />
            <Card.Body>
              <Card.Title>18</Card.Title>
              <Card.Text>Products</Card.Text>

              <Card.Link href="/view-products">View Products</Card.Link>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              style={{ height: "10em", objectFit: "contain" }}
              variant="top"
              src={orders_img}
            />
            <Card.Body>
              <Card.Title>{noOfOrders}</Card.Title>
              <Card.Text>Pending Orders</Card.Text>

              <Card.Link href="/orders">View Orders</Card.Link>
            </Card.Body>
          </Card>
        </CardColumns>

        <h2 style={{ marginTop: "2em", marginBottom: "1em" }}>Orders:</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Customer Email</th>
              <th>Total Quantity</th>
              <th>Total Aount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => {
              return (
                // CHANGE THE ROUTE BELOW TO DESIRED PATH
                <tr
                  onClick={(e) => {
                    history.push("/order/" + order.orderId);
                  }}
                >
                  <td>{order.orderId}</td>
                  <td>{order.buyerEmail}</td>
                  <td>{order.totalQuantity}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.status}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
