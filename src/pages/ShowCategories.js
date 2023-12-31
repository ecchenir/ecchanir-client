import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import useCategory from "../hooks/useCategory";

const CategoryCard = React.memo(({ category, navigate }) => (
  <Col key={category._id}>
    <Card onClick={() => navigate(`/category/${category.name}`)}>
      <div>
        <Card.Img variant="top" height={120} src={category.photo} />
        <p style={{ textAlign: "center", marginBottom: "0" }}>
          {category.name}
        </p>
      </div>
    </Card>
  </Col>
));

const ShowCategories = () => {
  const navigate = useNavigate();
  const categories = useCategory();

  return (
    <div className="mt-2">
      <h3 className="p-3 m-3 text-center show">Browse By Category</h3>
      <div className="container">
        <Row xs={3} md={6} lg={8} sm={5} className="g-2">
          {categories.map((c) => (
            <CategoryCard key={c._id} category={c} navigate={navigate} />
          ))}
        </Row>
      </div>
    </div>
  );
};

export default ShowCategories;
