import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {
  Form,
  Input,
  Label,
  FormGroup,
  FormFeedback,
  Button,
  Col,
  Row,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
} from "reactstrap";
import { isEmail } from "validator";
import "../css/registeration.css";
import axios from "axios"
import auth from "../model/auth"
import { apiBaseURL } from "../model/env_variables";

class SignInSeller extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => ({
    data: {
      email: "",
      password: "",
    },
    errors: {},
  });

  handleChange = (e) => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value,
      },
      errors: {
        ...this.state.errors,
        [e.target.name]: "",
      },
    });
  };

  validate = () => {
    // const;
    let errors = {};
    const data = this.state.data;

    // this.getLocation();
    if (!isEmail(data.email)) errors.email = "Please enter a valid email";
    if (data.email === "") errors.email = "Email can not be blank.";
    if (data.password === "") errors.password = "Password can not be blank.";
    // this.setState({ errors });
    return errors;
  };


  handleSubmit = (e) => {
    e.preventDefault();


    const errors = this.validate();
    const { data } = this.state;

    if (Object.keys(errors).length === 0) {
      // Call API here to save data in neo4j SELLER DATA
      var emailA = this.state.data.email;
      var passwordA = this.state.data.password;
      var history = this.props.history
      axios.get(apiBaseURL+"/seller-login",{
        params:{
          email: emailA,
          password: passwordA
        }
      }).then((res)=>{
        console.log(res.data);
        if(res.data.status === "authenticated"){
          
          this.setState(this.getInitialState());
          auth.login({"email":emailA,type:res.data.type},history)

  
        }else{
          
          errors.email = res.data.error_email;
          errors.password = res.data.error_password;
          // console.log(res);
          this.setState({errors})
  
        }
      },(error)=>{
        console.log(error);
        errors.email = "Login failed";
        errors.password = "";
        this.setState({errors})
      })
      
      
      
    } else {
      this.setState({ errors });
    }
  };

  render() {
    const { data, errors } = this.state;
    return (
      <section className="content">
        
        <Navbar className="Navbar" light expand="md">
          <NavbarBrand className="text-white" href="/">
            JustTanned
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.isOpen} navbar>
            <Nav className="mr-auto text-white" navbar></Nav>

            <NavLink className="text-white" href="http://localhost:7000/signin-buyer">
              Buyer Login
            </NavLink>
          </Collapse>
        </Navbar>

        {/* <Container> */}
        <h1 className="heading"> Seller Login </h1>

        <div className="formInfo">
          <Col md={4}>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  id="email"
                  value={data.email}
                  invalid={errors.email ? true : false}
                  name="email"
                  onChange={this.handleChange}
                  placeholder="johnsnow@gmail.com"
                />
                <FormFeedback>{errors.email}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  value={data.password}
                  invalid={errors.password ? true : false}
                  onChange={this.handleChange}
                  placeholder="Atleast 6 characters long"
                />
                <FormFeedback>{errors.password}</FormFeedback>
              </FormGroup>
              {/* </Col> */}
              {/* <Col md={6}> */}
              <Button
                block
                color="secondary"
                type="submit"
                style={{ marginTop: 30, backgroundColor: "#323232" }}
              >
                Login
              </Button>
            </Form>
            <h5 className="heading" style={{ marginTop: 10 }}>
              or
            </h5>
            <Button
              href = "/signup-seller"
              block
              color="secondary"
              style={{ marginTop: 10, backgroundColor: "#323232" }}
            >
              New Here ? Signup
            </Button>
          </Col>
        </div>

        {/* </Container> */}

        <footer className="footer">
          <Row>
            <div className="paragraph">
              This webpage is created for Just Tanned. No copyrights here.
            </div>

            <p className="paragraph">
              Copyright &copy; 2020 by JustTanned. All rights reserved.
            </p>
          </Row>
        </footer>
      </section>
    
    );
  }
}

export default SignInSeller;
