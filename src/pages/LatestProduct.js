import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/Homepage.css";
import { useNavigate } from "react-router-dom";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const LatestProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "https://new-ecchanir-server.vercel.app/api/v1/latestproduct/get-latestproduct"
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  // console.log(products);
  return (
    <div className="mb-5">
      <h3 className="show p-2 text-center">Latest Product</h3>

      <div className="container">
        <Row xs={2} sm={3} md={4} lg={4} className="g-2">
          {products.map((p) => (
            <Col key={p._id}>
              <Card
                onClick={() => navigate(`/latestproduct/${p.slug}`)}
                className="productCard"
              >
                <img
                  style={{
                    objectFit: "cove",
                    width: "100%",
                    minHeight: "200px",
                  }}
                  src={`https://new-ecchanir-server.vercel.app/api/v1/latestproduct/latestproduct-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />

                <div className="card-body">
                  <div>
                    <h5 className="cardTitle">{p.name}</h5>
                    <p className="price">{p.price}Taka</p>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default LatestProduct;
