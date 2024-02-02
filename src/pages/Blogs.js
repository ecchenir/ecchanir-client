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
        // console.log(data);
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

  // console.log(blogs);
  return (
    <Layout>
      <div className="container">
        <p className="text-center display-6">Recent Blogs</p>
        {reversedProduct.map((b, index) => (
          <div key={index} className="row">
            <div className="col-md-6 mt-3 d-flex align-items-center justify-content-center">
              <img src={b.photo} alt="" className="img-fluid" />
            </div>
            <div className="col-md-6 mt-3">
              <h1>{b.title}</h1>
              <p>{b.name}</p>
              <p><span>Meting date :  </span>{new Date(b?.createdAt).toLocaleDateString()}</p>

            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
