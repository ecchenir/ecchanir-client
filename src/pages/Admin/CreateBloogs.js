import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const CreateBloogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      // console.log(productData);
      productData.append("name", name);
      productData.append("photo", photo);
      const { data } = axios.post(
        "https://new-ecchanir-server.vercel.app/api/v1/blogs/create-blogs",
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("create Created Successfully");
        // navigate("/dashboard/admin/banners");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //getall products

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

  console.log(blogs);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="mb-3">
              <textarea
                type="text"
                className="form-control"
                placeholder="Write a blogs description"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {/* image uploading */}
            <div className="mb-3">
              <label className="btn btn-outline-success  col-md-12">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            {/* image showing */}
            <div className="mb-3">
              {photo && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              )}
            </div>
            <button
              type="submit"
              onClick={handleCreate}
              className="btn btn-success"
            >
              Create Blogs
            </button>
            <div className="col-md-9">
              <h1 className="text-center">All  Blogs List</h1>
              <div className="d-flex flex-wrap">
                {blogs?.map((p) => (
                  <Link
                    key={p._id}
                    // to={`/dashboard/admin/banner/${p.slug}`}
                    className="product-link"
                  >
                    <div className="card m-2" style={{ width: "18rem" }}>
                      <img
                        src={`https://new-ecchanir-server.vercel.app/api/v1/blogs/blogs-photo/${p._id}`}
                        className="card-img-top"
                        height={"150px"}
                        alt={p.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">Name: {p.name}</h5>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            {/* Handle create Sub Category  */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateBloogs;
