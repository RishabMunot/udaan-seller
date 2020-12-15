import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Auth from "../../model/auth";
import { useHistory } from "react-router-dom";


function SellerNavbar() {

  var history = useHistory();
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <div className="container">
        <Navbar.Brand href="/">JustTanned.in</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="view-orders">Orders</Nav.Link>
            <NavDropdown title="Products" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/view-products">View Products</NavDropdown.Item>
              <NavDropdown.Item href="/add-products">
                  Add Product
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link onClick={()=>{Auth.logout(history)}}>Log Out</Nav.Link>

          </Nav>
        </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
}

export default SellerNavbar;
