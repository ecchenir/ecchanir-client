import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";


const CategoryCard = React.memo(({ category, navigate }) => (
  <Col key={category._id}>
    <Card onClick={() => navigate(`/category/${category._id}`)}>
      <div>
        <Card.Img variant="top" height={120} src={category.photo} />
        <p style={{ textAlign: "center", marginBottom: "0" }}>
          {category.name}
        </p>
      </div>
    </Card>
  </Col>
));



const Categories = () => {
  const categories = useCategory();
  const navigate = useNavigate();
  return (
    <Layout title={"All Categories"}>
      <div className="container" style={{ marginTop: "100px" }}>
      <div className="container">
        <Row xs={3} md={6} lg={8} sm={5} className="g-2">
          {categories.map((c) => (
            <CategoryCard key={c._id} category={c} navigate={navigate} />
          ))}
        </Row>
      </div>
      </div>
    </Layout>
  );
};

export default Categories;