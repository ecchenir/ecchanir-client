import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const LatestProductDetails = () => {
  const [cart, setCart] = useCart();
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [selectedSize, setSelectedSize] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://new-ecchanir-server.vercel.app/api/v1/latestproduct/get-latestproduct/${params.slug}`
      );
      setProduct(data?.product);
      //   getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  //   const getSimilarProduct = async (pid, cid) => {
  //     try {
  //       const { data } = await axios.get(
  //         `https://new-ecchanir-server.vercel.app/api/v1/product/related-product/${pid}/${cid}`
  //       );
  //       setRelatedProducts(data?.products);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

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
    const updatedOrderData = [newOrder, ...existingOrderData];

    // Set the updated order data in local storage
    localStorage.setItem("orderData", JSON.stringify(updatedOrderData));

    // Navigate to the order creation page
    navigate("/buyNow");
  };

  return (
    <Layout>
      <div className="row container  product-details">
        <div className="col-md-6">
          <img
            src={`https://new-ecchanir-server.vercel.app/api/v1/latestproduct/latestproduct-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center show">Product Details</h1>
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>Category : {product?.category?.name}</h6>
          <h6>Price : {product.price} taka</h6>
          <h6>Category : {product?.category?.name}</h6>

          <div className="mb-3 ">
            <p className="mb-0">Size :</p>
            <div className="d-flex gap-2">
              <label>
                <input
                  type="radio"
                  name="size"
                  value="M"
                  checked={selectedSize === "M"}
                  onChange={() => handleSizeChange("M")}
                />
                M
              </label>
              <label>
                <input
                  type="radio"
                  name="size"
                  value="L"
                  checked={selectedSize === "M"}
                  onChange={() => handleSizeChange("M")}
                />
                L
              </label>
              <label>
                <input
                  type="radio"
                  name="size"
                  value="XL"
                  checked={selectedSize === "L"}
                  onChange={() => handleSizeChange("L")}
                />
                XL
              </label>
              <label>
                <input
                  type="radio"
                  name="size"
                  value="XXL"
                  checked={selectedSize === "XL"}
                  onChange={() => handleSizeChange("XL")}
                />
                XXL
              </label>
            </div>
          </div>

          <div className="d-flex">
            <button
              className="btn btn-success ms-1"
              onClick={handleBuyNowClick}
            >
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
      {/* <div className="row container similar-products">
        <h6>Similar Products ➡️</h6>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" key={p._id}>
              <img
                src={`https://new-ecchanir-server.vercel.app/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price">
                    {p.price}
                  </h5>
                </div>
                <p className="card-text ">
                  {p.description.substring(0, 60)}...
                </p>
                <div className="d-flex">
                    <button className="btn btn-success ms-1"  onClick={()=>navigate("/CreateOrder")} >Buy Now</button>
                    
                   <button className="btn btn-secondary ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to cart");
                    }} >Add to cart</button>
                    </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </Layout>
  );
};

export default LatestProductDetails;
