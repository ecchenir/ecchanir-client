import Layout from "../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import React, { useState, useEffect } from "react";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "https://new-ecchanir-server.vercel.app/api/v1/blogs/get-blogs"
      );
      if (data?.success) {
        setBlogs(data?.blogs);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const reversedProduct = [...blogs].reverse();

  console.log(blogs);
  return (
    <Layout>
      <div className="row container ">
        <p className="text-center "> Recent Blogs</p>
        {reversedProduct.map((b, index) => (
          <div key={index} className="row ">
            <div className="col-md-6 mt-3">
              <img src="blog1.jpg" alt="" />
            </div>
            <div className="col-md-6">
              <h1> EccheNir</h1>
              <p>{b.name}</p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
