import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "reactstrap";
import { apiBaseURL } from "../../model/env_variables";
import SellerNavbar from "./SellerNavbar";

const ProductDetail = (props) => {
  const [product, setproduct] = useState({
    product_description: "",
    product_title: "",
    price: "",
    productId: "",
    stock: "",
    color: "",
    image_url: "",
    category: "",
  });
  const [success, setSuccess] = useState(false);

  const [userId, setUserId] = useState(0);

  const fetchMarker = async () => {
    const res = await Axios.get("http://localhost:5000/get-product-id", {
      params: { product_id: props.match.params.productId },
    });
    console.log(res.data);
    setproduct(res.data);
  };

  const handleChange = (e) => {
    if (e.target.id === "image") {
      setproduct({
        ...product,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setproduct({ ...product, [e.target.id]: e.type.value });
    }
  };

  const updateData = () => {
    console.log(product);
    Axios.get(apiBaseURL + "/update-post", product)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchMarker();
  }, [userId]);

  return (
    <>
      <SellerNavbar />
      <div className="row container">
        <div className="col-md-5">
          <img
            style={{ width: "100%", objectFit: "cover" }}
            alt={product.product_descriptions}
            src={product.image_url}
          />
        </div>
        <div className="col-md-7">
          <article className="card-body p-5">
            <Form onSubmit={updateData} enctype="multipart/form-data">
              <h3 className="title mb-3">
                <input id="product_title" value={product.product_title} />
              </h3>

              <p className="price-detail-wrap">
                <span className="price h3 text-warning">
                  <span className="currency">₹ </span>
                  <input
                    id="price"
                    onChange={handleChange}
                    value={product.price.low}
                  />
                  <span className="num"></span>
                </span>
              </p>
              <dl className="item-property">
                <dt>Description</dt>
                <dd>
                  <p className="text-capitalize">
                    <input
                      id="product_description"
                      onChange={handleChange}
                      value={product.product_description}
                    />
                  </p>
                </dd>
              </dl>
              <dl className="param param-feature">
                <dt>Category</dt>
                <dd className="text-capitalize">
                  <input
                    id="category"
                    onChange={handleChange}
                    value={product.category}
                  />
                </dd>
              </dl>

              <dl className="param param-feature">
                <dt>Color</dt>
                <dd>
                  <input
                    id="color"
                    onChange={handleChange}
                    value={product.color}
                  />
                </dd>
              </dl>
              <dl className="param param-feature">
                <dt>Stock</dt>
                <dd>
                  <input
                    id="stock"
                    onChange={handleChange}
                    value={product.stock}
                  />
                </dd>
              </dl>

              <hr />
              <hr />
              <button
                type="submit"
                className={"btn btn-lg btn-primary text-uppercase"}
              >
                <i className="fa fa-shopping-cart" /> {"update Data"}
              </button>
            </Form>
          </article>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
