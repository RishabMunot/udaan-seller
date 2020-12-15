import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Auth from "../model/auth";
import SellerHome from "../view/Seller/SellerHome";

function Home() {

  var history = useHistory();
  var isSeller = Auth.getUserData().type==="seller";

  if (Auth.isAuthenticated() === "false" && Auth.getUserData().type === "seller") history.push("/signin-seller");
  if (Auth.isAuthenticated() === "false" && Auth.getUserData().type === "buyer") history.push("/signin-buyer");


  return (<>{<SellerHome />}</>)
  
}

export default Home;

