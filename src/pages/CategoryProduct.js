import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/CategoryProductStyles.css";
import axios from "axios";
import { FaRegStar, FaStar } from "react-icons/fa";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Rating from "react-rating";

const CategoryProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (id) getPrductsByCat();
  }, [id]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Adds smooth scrolling animation
    });
  }, []);

  // console.log(id);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `https://new-ecchanir-server.vercel.app/api/v1/product/get-allProduct`
      );
      // console.log(data);
      setProducts(data);
      setFilteredProducts(data);
      // setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  const cateGoryProduct = products.filter((item) => item.category === `${id}`);

  // console.log(cateGoryProduct);

  const trendingProduct = cateGoryProduct.filter(
    (item) => item.productType === "trending"
  );

  // console.log(trendingProduct);
  // search input

  const handleSearch = () => {
    const filtered = cateGoryProduct.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <Layout>
      <div className="container mt-3 ">
        {/* <h4 className="text-center">{category?.name}</h4> */}

        {/* search input  */}
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => {
            setSearch(e.target.value);
            handleSearch(); // Call handleSearch to filter products on each keystroke
          }}
        />

        {/* <h6 className="text-center">{products?.length} result found </h6> */}

        {trendingProduct.length >= 1 && (
          <div className="mb-5 mt-2">
            <h6 className="text-center display-6">Trending Product</h6>
            <div className="container">
              <Row xs={2} sm={3} md={4} lg={5} className="g-2">
                {trendingProduct.map((tp) => (
                  <Col key={tp._id}>
                    <Card
                      onClick={() => navigate(`/product/${tp._id}`)}
                      className="productCard"
                    >
                      <img
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          minHeight: "168px",
                        }}
                        src={tp.photo}
                        className="card-img-top"
                        alt={tp.name}
                        onClick={() => navigate(`/product/${tp._id}`)}
                      />
                      <div className="card-body">
                        <div>
                          <h5 className="cardTitle">
                            {tp.name.length <= 20
                              ? tp.name
                              : `${tp.name.substring(0, 20)}...`}
                          </h5>
                          <p className="price">৳ {tp.discount} </p>
                          <p className="discountPrice">৳ {tp.price}</p>
                        </div>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        )}

        <div className="container">
          <h6 className="text-center display-6"> Category Products</h6>
          <Row xs={2} sm={3} md={4} lg={5} className="g-2">
            {cateGoryProduct.map((p) => (
              <Col key={p._id}>
                <Card
                  onClick={() => navigate(`/product/${p._id}`)}
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
                    onClick={() => navigate(`/product/${p._id}`)}
                  />
                  <div className="card-body">
                    <div>
                      <h5 className="cardTitle">
                        {p.name.length <= 20
                          ? p.name
                          : `${p.name.substring(0, 20)}...`}
                      </h5>
                      <p className="price">৳ {p.discount} </p>
                      <p className="discountPrice">৳ {p.price}</p>
                    </div>
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

export default CategoryProduct;
