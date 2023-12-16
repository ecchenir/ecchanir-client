// components/Banner.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';

const Banner = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get('/api/v1/banner/get-banner');
      setProducts(data.products);
      // console.log(data.products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Carousel >
      {products.map((p, index) => (
        <Carousel.Item className='' key={index}>
          <img style={{objectFit:'cover'}}
            className="d-block banner-image w-100"
            src={`/api/v1/banner/banner-photo/${p._id}`}
            alt={`Banner ${index + 1}`}
          />
          <Carousel.Caption>
            <p className='text-white'>{p.name}</p>
            
            {/* <p>{p.slug}</p> */}
            <a class="btn  btn-outline" href="/" role="button">Shop Now</a>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Banner;
