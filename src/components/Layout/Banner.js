// components/Banner.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Banner = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `https://new-ecchanir-server.vercel.app/api/v1/category/single-category/${id}`
      );

      setCategories(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  // console.log("mmm");

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "https://new-ecchanir-server.vercel.app/api/v1/banner/get-banner"
      );
      setProducts(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllProducts();
    getAllCategory();
  }, []);

  console.log(products);
  return (
    <Carousel>
      {products.map((p, index) => (
        <Carousel.Item className="" key={index}>
          <img
            style={{ objectFit: "cover" }}
            className="d-block banner-image w-100"
            src={p.photo}
            alt={`Banner ${index + 1}`}
          />
          <Carousel.Caption>
            <p className="text-white mt-2">{p.name}</p>

            {/* Access the category property for each product */}
            {/* {setId(p.category)} */}

            <a
              className="btn text-black"
              onClick={() => navigate(`/category/${p.category}`)}
              role="button"
            >
              Shop Now
            </a>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Banner;
