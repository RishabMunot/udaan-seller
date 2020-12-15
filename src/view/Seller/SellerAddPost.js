import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { serialize } from "object-to-formdata";
import {
  Form,
  Input,
  Label,
  FormGroup,
  FormFeedback,
  Button,
  Col,
  Row,
} from "reactstrap";
import "../../css/registeration.css";
import axios from "axios";
import Auth from "../../model/auth";
import { apiBaseURL } from "../../model/env_variables";
import SellerNavbar from "./SellerNavbar";

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => ({
    data: {
      product_title: "",
      category: "",
      product_description: "",
      price: "",
      stock: "",
      color:""
    },
    errors: {},
  });

  handleChange = (e) => {
    console.log(e.target.id);
    if (e.target.id === "image") {
      this.setState({
        data: {
          ...this.state.data,
          [e.target.name]: e.target.files[0],
        },
        errors: {
          ...this.state.errors,
          [e.target.name]: "",
        },
      });
    } else {
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
    }
  };

  validate = () => {
    // const;
    let errors = {};
    const data = this.state.data;
    return errors;
  };

  getLoc = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      return {
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      };
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    const { data } = this.state;
    data.email = Auth.getUserData().email;

    let formData = serialize(data);

    console.log(formData.get("image"));

    if (Object.keys(errors).length === 0) {
      // Call API here to save data in neo4j SELLER DATA
      console.log(Auth.getUserData().email);

      axios({
        method: "POST",
        url: apiBaseURL + "/add-post",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(
        (res) => {
          console.log(res.data);
          if (res.data.status === "added") {
            this.setState(this.getInitialState());
            console.log("ADDED PRODUCT SUCCESSFULLY");
          } else {
            console.log("ERRR");
          }
        },
        (error) => {
          console.log(error);
          errors.email = "Login failed";
          errors.password = "";
          this.setState({ errors });
        }
      );
    } else {
      this.setState({ errors });
    }
  };

  render() {
    const { data, errors } = this.state;
    return (
      <section className="content">
          <SellerNavbar/>

        {/* <Container> */}
        <h1 className="heading"> Add Post </h1>

        <div className="formInfo">
          <Col md={4}>
            <Form onSubmit={this.handleSubmit} enctype="multipart/form-data">
              <FormGroup>
                <Label for="product_title">Product Title</Label>
                <Input
                  id="product_title"
                  value={data.product_title}
                  invalid={errors.product_title ? true : false}
                  name="product_title"
                  onChange={this.handleChange}
                  placeholder="Premium Quality Leather Jacket"
                />
                <FormFeedback>{errors.product_title}</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label for="category">Category</Label>
                <Input
                  name="category"
                  id="category"
                  value={data.category}
                  invalid={errors.category ? true : false}
                  onChange={this.handleChange}
                  placeholder="Jacket"
                />
                <FormFeedback>{errors.category}</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label for="product_description">Description</Label>
                <Input
                  type="product_description"
                  name="product_description"
                  id="product_description"
                  value={data.product_description}
                  invalid={errors.product_description ? true : false}
                  onChange={this.handleChange}
                  placeholder="Premium Quality 100%pure Leather. Finely Stiched Jackets. Full Sleeves"
                />
                <FormFeedback>{errors.product_description}</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label for="color">Product Color</Label>
                <Input type="select" name="color" onChange = {this.handleChange} id="exampleSelect">
                  <option>Black</option>
                  <option>White</option>
                  <option>Brown</option>
                  <option>Maroon</option>
                  <option>Navy Blue</option>
                  <option>Grey</option>
                  <option>Khaki</option>
                  <option>Red</option>
                </Input>
              </FormGroup>

              <FormGroup>
                <Label for="Images">Images</Label>
                <Input
                  type="file"
                  name="image"
                  id="image"
                  onChange={this.handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="price">Price</Label>
                <Input
                  type="price"
                  name="price"
                  id="price"
                  value={data.price}
                  invalid={errors.price ? true : false}
                  onChange={this.handleChange}
                  placeholder="Product Price"
                />
                <FormFeedback>{errors.price}</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label for="stock">Stock</Label>
                <Input
                  type="stock"
                  name="stock"
                  id="stock"
                  value={data.stock}
                  invalid={errors.stock ? true : false}
                  onChange={this.handleChange}
                  placeholder="Available Stock"
                />
                <FormFeedback>{errors.stock}</FormFeedback>
              </FormGroup>

              {/* </Col> */}
              {/* <Col md={6}> */}
              <Button
                block
                color="secondary"
                type="submit"
                style={{ marginTop: 30, backgroundColor: "#323232" }}
              >
                Add Post
              </Button>
            </Form>
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

export default AddPost;
