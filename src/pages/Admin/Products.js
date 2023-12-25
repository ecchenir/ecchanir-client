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
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "https://new-ecchanir-server.vercel.app/api/v1/product/get-product"
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
                          src={`https://new-ecchanir-server.vercel.app/api/v1/product/product-photo/${p._id}`}
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
