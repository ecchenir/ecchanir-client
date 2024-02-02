import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  //getall products
  // const getAllProducts = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       // "https://new-ecchanir-server.vercel.app/api/v1/product/get-product"
  //       "http://localhost:5000/api/v1/product/get-allProduct"
  //     );
  //     setProducts(data);
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Something Went Wrong");
  //   }
  // };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://new-ecchanir-server.vercel.app/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      // console.log(data.products);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://new-ecchanir-server.vercel.app/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSeeMore = () => {
    setPage(page + 1);
  };

  // const reversedProduct = [...products].reverse();

  // console.log(products);
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Products List</h1>
            <div className="d-flex flex-wrap">
              <div className="container">
                <Row xs={2} sm={3} md={4} lg={4} className="xs:g-2 g-2">
                  {products.map((p) => (
                    <Col key={p._id}>
                      <Card
                        onClick={() =>
                          navigate(`/dashboard/admin/product/${p._id}`)
                        }
                        // onClick={() => navigate(`/product/${p.slug}`)}
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
                          // height={"150px"}
                          alt={p.name}
                        />
                        <div className="card-body">
                          <h5 className="cardTitle">
                            {p.name.length <= 20
                              ? p.name
                              : `${p.name.substring(0, 20)}...`}
                          </h5>

                          <p className="discountPrice">৳ {p.price}</p>
                          <p className="price">৳ {p.discount}</p>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>

                <div className="d-flex justify-content-center mt-3">
                  <button className="btn btn-primary  " onClick={handleSeeMore}>
                    See More
                  </button>
                </div>
              </div>

              {/* {products?.map((p) => (
                <Link
                  key={p._id}
                  to={`/dashboard/admin/product/${p._id}`}
                  className="product-link"
                >
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img
                      src={`https://new-ecchanir-server.vercel.app/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      height={"150px"}
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">Name : {p.name}</h5>

                      <p className="card-text">Description : {p.description}</p>
                      <p className="card-text">
                        Product code :{p.productNumber}
                      </p>
                      <p className="card-text price">
                        {" "}
                        Discount :{p.price}Taka
                      </p>
                      <p className="card-text discountPrice">
                        {" "}
                        Price :{p.discount}Taka
                      </p>
                    </div>
                  </div>
                </Link>
              ))} */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
