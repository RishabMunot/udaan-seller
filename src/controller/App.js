import "../css/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./Home";
import SignInSeller from "../view/SignInSeller";
import SignUpSeller from "../view/SignUpSeller";

import React from "react";
import auth from "../model/auth";
import SellerAllProducts from "../view/Seller/SellerAllProducts";
import AddPost from "../view/Seller/SellerAddPost";
import SellerAllOrders from "../view/Seller/SellerAllOrders";
import ProductDetail from "../view/Seller/EditProduct";
import OrderDetail from "../view/Seller/OrderDetail";

function App(props) {
  return (
    <Router>
      <Switch>
        <Route exact path="/signin-seller" component={SignInSeller} />
        <Route exact path="/signup-seller" component={SignUpSeller} />
        {<Route exact path="/view-products" component={SellerAllProducts} />}
        <Route exact path="/product/:productId" component={ProductDetail} />
        <Route exact path="/order/:orderId" component={OrderDetail} />
        <Route exact path="/add-products" component={AddPost} />
        <Route exact path="/view-orders" component={SellerAllOrders} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
