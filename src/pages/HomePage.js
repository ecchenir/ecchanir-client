import React, { useState, useEffect } from "react";
import Banner from "../components/Layout/Banner";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../styles/Homepage.css";
import { AiOutlineReload } from "react-icons/ai";
import LatestProduct from "./LatestProduct";
import ShowCategories from "./ShowCategories";
import { useCart } from "../context/cart";
import { FaRegStar, FaStar } from "react-icons/fa";
import Rating from "react-rating";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import SubcategoryHeader from "./SubcategoryHeader";

const HomePage = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Buy Now
  const [visible, setVisible] = useState(false);

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "https://new-ecchanir-server.vercel.app/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // //get products
  // const getAllProducts = async () =>{
  //   try {
  //     const {data} = await axios.get("https://new-ecchanir-server.vercel.app/api/v1/product/get-product");
  //     setProducts(data.products);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // };

  // useEffect(()=>{
  //   getAllProducts();
  // });

  // filter by cat
  // const handleFilter = (value, id) => {
  //   let all = [...checked];
  //   if (value) {
  //     all.push(id);
  //   } else {
  //     all = all.filter((c) => c !== id);
  //   }
  //   setChecked(all);
  // };
  // useEffect(() => {
  //   if (!checked.length || !radio.length) getAllProducts();
  // }, [checked.length, radio.length]);

  // useEffect(() => {
  //   if (checked.length || radio.length) filterProduct();
  // }, [checked, radio]);

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://new-ecchanir-server.vercel.app/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "https://new-ecchanir-server.vercel.app/api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
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

  //order

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "https://new-ecchanir-server.vercel.app/api/v1/product/product-filters",
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
      // console.log(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(products);
  return (
    <Layout>
      <SubcategoryHeader />
      <Banner />
      {/* show category product */}
      <ShowCategories />

      <h2 className="p-2 text-center lg:mt-5 w-100%  md:mt-3 show">
        EccheNir Products
      </h2>
      {/* .........❤️❤️❤️❤️❤️❤️....... */}
      {/* show product */}
      <div className="container">
        <Row xs={2} sm={3} md={4} lg={4} className="xs:g-2 g-2">
          {products.map((p) => (
            <Col key={p._id}>
              <Card
                onClick={() => navigate(`/product/${p.slug}`)}
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
                    {" "}
                    {p.name.length <= 20
                      ? p.name
                      : `${p.name.substring(0, 20)}...`}
                  </h5>

                  <p className="discountPrice">৳ {p.price}</p>
                  <p className="price">৳ {p.discount}</p>
                  {/* <Rating
                    className="ml-3"
                    placeholderRating={p.rating}
                    readonly
                    emptySymbol={<FaRegStar></FaRegStar>}
                    placeholderSymbol={<FaStar className='text-warning'></FaStar>}
                    fullSymbol={<FaStar></FaStar>}
                  /> */}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* latestProduct */}
      <LatestProduct className="pt-5" />
    </Layout>
  );
};

export default HomePage;
