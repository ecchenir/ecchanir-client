import React, { useState, useEffect, useRef } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import SizeSelector from "./SizeSelector";
import Spinner from "../components/Loader/Spinner";

const ProductDetails = () => {
  const [cart, setCart] = useCart();
  const params = useParams();
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [availableSizes, setAvailableSizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryId, setCategoryId] = useState();

  useEffect(() => {
    const isReloaded = sessionStorage.getItem("isReloaded");
    console.log("ssss");
    if (!isReloaded) {
      window.location.reload();
      sessionStorage.setItem("isReloaded", true);
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    return () => {
      sessionStorage.removeItem("isReloaded");
    };
  }, []);

  // Fetch product details and related products
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data
        const { data } = await axios.get(
          `https://new-ecchanir-server.vercel.app/api/v1/product/get-product/${id}`
        );
        setProduct(data?.product);

        if (
          data?.product.selectedOptions &&
          data?.product.selectedOptions.length > 0
        ) {
          setAvailableSizes(data?.product.selectedOptions);
          setSelectedSize(data?.product.selectedOptions[0]);
        }

        setCategoryId(data.product.selectedSubcategory);

        const similarProductsResponse = await axios.get(
          `https://new-ecchanir-server.vercel.app/api/v1/product/get-allProduct`
        );
        setRelatedProducts(similarProductsResponse.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchData();
  }, [id]);

  // Handle size change

  const relProduct = relatedProducts.filter(
    (item) => item.selectedSubcategory === `${categoryId}`
  );

  console.log(relProduct);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  return (
    <Layout>
      {loading ? ( // Show loading spinner if data is still loading
        <Spinner />
      ) : (
        <div className="container">
          {/* Product details */}
          <div className="row container  product-details">
            {/* Product image */}
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
            {/* Product information */}
            <div className="col-md-6 product-details-info">
              <h6 style={{ fontSize: "20px", fontWeight: "bolder" }}>
                {product.name}
              </h6>
              <p className="discountPrice">৳ {product.price} </p>
              <p className="price">৳ {product.discount} </p>
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
            <h1 className="text-center show">Product Details</h1>
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
        </div>
      )}
      <hr />
      {/* Similar Products */}

      {loading ? (
        <Spinner />
      ) : (
        <div>
          <h6 className="container mb-3">Similar Products ➡️</h6>
          {relProduct.length < 1 && (
            <p className="text-center">No Similar Products found</p>
          )}
          <div className="container">
            <Row xs={2} sm={3} md={4} lg={5} className="g-2 ">
              {relProduct.slice(0, 4).map((p) => (
                <Col key={p._id}>
                  <Card
                    onClick={() => {
                      navigate(`/product/${p._id}`);
                      window.scrollTo(0, 0);
                    }}
                    className="productCard"
                  >
                    <img
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        minHeight: "168px",
                      }}
                      src={p.photo}
                      className="card-img-top"
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
      )}
    </Layout>
  );
};

export default ProductDetails;
