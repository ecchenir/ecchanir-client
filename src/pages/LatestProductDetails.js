import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import SizeSelector from "./SizeSelector";
import Spinner from "../components/Loader/Spinner";

const LatestProductDetails = () => {
  const [cart, setCart] = useCart();
  const params = useParams();
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [availableSizes, setAvailableSizes] = useState([]);

  //initalp details
  useEffect(() => {
    if (id) getProduct();
  }, [id]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Adds smooth scrolling animation
    });
  }, []);

  console.log(id);
  console.log(product);

  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://new-ecchanir-server.vercel.app/api/v1/latestproduct/get-latestproduct/${id}`
        // `https://new-ecchanir-server.vercel.app/api/v1/latestproduct/get-latestproduct/${id}`
      );
      setProduct(data?.product);
      console.log(data);
      setLoading(false);

      if (
        data?.product.selectedOptions &&
        data?.product.selectedOptions.length > 0
      ) {
        setAvailableSizes(data?.product.selectedOptions);
        setSelectedSize(data?.product.selectedOptions[0]); // Set the default selected size
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      {loading ? (
        <Spinner />
      ) : (
        <div className="container">
          <div className="row container  product-details">
            <div
              className="col-md-6"
              style={{ position: "relative", maxHeight: "380px" }}
            >
              <img
                src={product.photo}
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
                <button
                  className="btn btn-dark ms-1"
                  onClick={() => {
                    setCart([...cart, { ...product, selectedSize }]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, { ...product, selectedSize }])
                    );
                    toast.success("Item Added to cart");
                    navigate("/cart");
                  }}
                >
                  Buy Now
                </button>

                <button
                  className="btn btn-secondary ms-1"
                  onClick={() => {
                    setCart([...cart, { ...product, selectedSize }]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, { ...product, selectedSize }])
                    );
                    toast.success("Item Added to cart");
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
        </div>
      )}
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
