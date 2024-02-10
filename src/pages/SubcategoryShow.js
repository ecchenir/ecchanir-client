import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "../components/Loader/Spinner";

export default function SubcategoryShow() {
  // const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const params = useParams();
  // const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // console.log(params.name);

  useEffect(() => {
    if (params?.name);
  }, [params?.name]);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://new-ecchanir-server.vercel.app/api/v1/product/get-allProduct`
      );
      setLoading(false);
      // console.log(data);
      setProducts(data);
      // console.log(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const fetchProduct = products.filter(
    (item) => item.selectedSubcategory.trim() === `${params?.name.trim()}`
  );

  // console.log(fetchProduct);

  return (
    <Layout>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <p className="display-6 text-center my-3">{params.name}</p>
          <div className="container">
            <Row xs={2} sm={3} md={4} lg={4} className="xs:g-2 g-2">
              {fetchProduct.map((p) => (
                <Col key={p._id}>
                  <Card
                    onClick={() => navigate(`/product/${p._id}`)}
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
                      <h5 className="cardTitle">{p.name}</h5>
                      {/* <h5 className="cardTitle">
                        {p.name.length <= 20
                          ? p.name
                          : `${p.name.substring(0, 20)}...`}
                      </h5> */}

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
}
