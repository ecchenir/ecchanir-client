import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/CategoryProductStyles.css";
import axios from "axios";
import { FaRegStar, FaStar } from "react-icons/fa";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Rating from 'react-rating';



const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search,setSearch]= useState('');

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setFilteredProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };


// search input 

const handleSearch = () => {
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );
  setFilteredProducts(filteredProducts);
};



  return (
    <Layout>
      <div className="container mt-3 ">
        <h4 className="text-center">{category?.name}</h4>
         
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


        <h6 className="text-center">{products?.length} result found </h6>

        <div className="container">
        <Row xs={2} sm={3} md={4} lg={5} className="g-2">
          {filteredProducts.map((p) => (
            <Col key={p._id}>
              <Card onClick={() => navigate(`/product/${p.slug}`)} className="productCard">
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  height={"150px"}
                  alt={p.name}
                  onClick={() => navigate(`/product/${p.slug}`)}
                />
                <div className="card-body">
                  <div>
                    <h5 className="cardTitle">{p.name}</h5>
                    <p className="price">{p.discount}Taka</p>
                    <p className="discountPrice">{p.price}Taka</p>
                    <Rating
                      className="ml-3"
                      placeholderRating={p.rating}
                      readonly
                      emptySymbol={<FaRegStar></FaRegStar>}
                      placeholderSymbol={<FaStar className='text-warning'></FaStar>}
                      fullSymbol={<FaStar></FaStar>}
                    />
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