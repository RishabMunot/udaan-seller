import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Table } from 'reactstrap';
import auth from '../../model/auth';
import SellerNavbar from './SellerNavbar';

function SellerAllOrders() {

  const [userId, setUserId] = useState(0);
  var history = useHistory()
    const [orders, setOrders] = useState([])
    const fetchOrder = async () => {
      const res = await Axios.get("http://localhost:5000/get-seller-orders", {
        params: { sellerEmail: auth.getUserData().email },
      });
      console.log(res.data);
      setOrders(res.data);
    };
  
    useEffect(() => {
      fetchOrder();
    }, [userId]);
  

    return (
        <div>
             <SellerNavbar />
      <div style={{ marginTop: "2em" }} className="container">
        <h1>All Orders</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Customer Email</th>
              <th>Total Quantity</th>
              <th>Total Amount</th>
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
    )
}

export default SellerAllOrders
