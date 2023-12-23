import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import SizeSelector from "./SizeSelector";

const ProductDetails = () => {
  const [cart, setCart] = useCart();
  const params = useParams();
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [availableSizes, setAvailableSizes] = useState([]);

  console.log(product);
  console.log(id);

  //initalp details
  useEffect(() => {
    if (id) getProduct();
  }, [id]);

  // ...

  console.log(relatedProducts);

  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://new-ecchanir-server.vercel.app/api/v1/product/get-product/${id}`
      );
      setProduct(data?.product);
      console.log(data);

      if (
        data?.product.selectedOptions &&
        data?.product.selectedOptions.length > 0
      ) {
        setAvailableSizes(data?.product.selectedOptions);
        setSelectedSize(data?.product.selectedOptions[0]); // Set the default selected size
      }

      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `https://new-ecchanir-server.vercel.app/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  // handle size control

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  // const handleSimilarProductClick = (slug) => {
  //   navigate(`/product/${slug}`);
  // };

  const handleBuyNowClick = () => {
    // Get existing order data from local storage
    const existingOrderData =
      JSON.parse(localStorage.getItem("orderData")) || [];

    // Create a new order object
    const newOrder = {
      product,
      selectedSize,
      // Add other relevant data
    };

    // Add the new order to the existing array
    const updatedOrderData = [...existingOrderData, newOrder];

    // Set the updated order data in local storage
    localStorage.setItem("orderData", JSON.stringify(updatedOrderData));
    console.log(updatedOrderData);
    // Navigate to the order creation page
    navigate("/buyNow");
  };

  // console.log(selectedSize);
  return (
    <Layout>
      <div className="row container  product-details">
        <div
          className="col-md-6"
          style={{ position: "relative", maxHeight: "380px" }}
        >
          <img
            src={`https://new-ecchanir-server.vercel.app/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            style={{ objectFit: "contain", width: "100%" }}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center show">Product Details</h1>
          <h6 style={{ fontSize: "20px", fontWeight: "bolder" }}>
            {product.name}
          </h6>
          <h6>{product.description}</h6>
          {/* <h6>{product?.category?.name}</h6> */}
          <p className="discountPrice">৳ {product.price} </p>
          <p className="price">৳ {product.discount} </p>

          {/* <h6>Category : {product?.category?.name}</h6> */}
          <div className=" ">
            <p className="mb-0">Size :</p>
            {availableSizes.length > 0 && (
              <SizeSelector
                sizes={availableSizes}
                selectedSize={selectedSize}
                onSizeChange={handleSizeChange}
              />
            )}
          </div>

          {selectedSize && (
            <p className="mt-2">Selected Size: {selectedSize}</p>
          )}

          <div className="d-flex mt-3">
            <button className="btn btn-dark ms-1" onClick={handleBuyNowClick}>
              Buy Now
            </button>

            <button
              className="btn btn-secondary ms-1"
              onClick={() => {
                setCart([...cart, product]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product])
                );
                toast.success("Item Added to cart");
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <hr />

      <div>
        <h6 className="container mb-3">Similar Products ➡️</h6>

        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="container">
          <Row xs={2} sm={3} md={4} lg={5} className="g-2 ">
            {relatedProducts.map((p) => (
              <Col key={p._id}>
                <Card
                  onClick={() => navigate(`/product/${p._id}`)}
                  className="productCard"
                >
                  <img
                    src={`https://new-ecchanir-server.vercel.app/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    height={"150px"}
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="cardTitle">{p.name}</h5>
                    <p className="discountPrice">৳ {p.price}</p>
                    <p className="price">৳ {p.discount}</p>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
