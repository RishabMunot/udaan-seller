import React from "react";
import Switch from "react-bootstrap/esm/Switch";
import { Route, Router } from "react-router-dom";
import AddPost from "../view/Seller/SellerAddPost";
import SellerAllOrders from "../view/SellerAllOrders";
import SellerAllProducts from "../view/SellerAllProducts";

function SellerController() {
  return (
    <Router>
      <Switch>
        <Route exact path="/view-products" component={SellerAllProducts} />
        <Route exact path="/add-products" component={AddPost} />
        <Route exact path="/view-orders" component={SellerAllOrders} />
        {/* <Route exact path="/" component={SignUpBuyer} />
        <Route exact path="/add-post" component={AddPost} /> */}
      </Switch>
    </Router>
  );
}

export default SellerController;
