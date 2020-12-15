import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Table } from "reactstrap";
import auth from "../../model/auth";
import { apiBaseURL } from "../../model/env_variables";
import SellerNavbar from "./SellerNavbar";

function SellerAllProducts() {
  var history = useHistory();
  var [products, setProducts] = useState([]);

  const [userId, setUserId] = useState(0);

  useEffect(() => {

    Axios.get(apiBaseURL+"/get-seller-products",{params:{email:auth.getUserData().email}})
    .then((res)=>{
      console.log(res.data)
      setProducts(res.data)
    }).catch((err)=>console.log(err))
  }, [userId]);

  return (
    <div>
      <SellerNavbar />
      <div style={{ marginTop: "2em" }} className="container">
        <h1>All Products</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Image</th>
              <th>Category</th>
              <th>Descrption</th>
              <th>Price</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => {
              return (
                // CHANGE THE ROUTE BELOW TO DESIRED PATH
                <tr
                  onClick={(e) => {
                    history.push("product/" + product.product_id);
                  }}
                >
                  <td>{product.product_id}</td>
                  <td>{product.product_title}</td>
                  <td>
                    <img
                      src={product.image_url}
                      style={{ height: "100px", OObjectFit: "cover" }}
                      alt="product"
                    />
                  </td>
                  <td>{product.category}</td>
                  <td>{product.product_description}</td>
                  <td>{product.price.low
                  }</td>
                  <td>{product.stock}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default SellerAllProducts;
