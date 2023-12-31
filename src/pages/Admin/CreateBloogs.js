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
  const [title, setTitle] = useState("");
  const [file, setFile] = useState();
  const [imageUrl, setImageURL] = useState(null);

  function handleImage(event) {
    setFile(event.target.files[0]);
    setImageURL(URL.createObjectURL(event.target.files[0]));
  }

  const handleCreate = async (e) => {
    if (!file) {
      console.error("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ddlqhzgu"); // Replace with your upload preset
    formData.append("api_key", "938218558923326"); // Replace with your API key

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/duqer4nsr/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();
    console.log("Image uploaded:", result.secure_url);

    e.preventDefault();
    try {
      const productData = new FormData();
      // console.log(productData);
      productData.append("name", name);
      productData.append("title", title);
      productData.append("photo", result.secure_url);
      const { data } = axios.post(
        "http://localhost:5000/api/v1/blogs/create-blogs",
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
        "http://localhost:5000/api/v1/blogs/get-blogs"
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
              <input
                type="text"
                className="form-control"
                placeholder="Write a blogs  title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                type="text"
                className="form-control"
                placeholder="Write a blogs description"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {imageUrl && ( // Display the image only when imageURL is not empty
              <div item xs={12}>
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  placeholder="photo"
                  height={"200px"}
                  className=" border-2"
                  style={{ maxWidth: "100%" }}
                />
              </div>
            )}
            <div className="mt-3" item xs={6}>
              <input
                type="file"
                accept="image/*"
                name="image"
                id=""
                onChange={handleImage}
              />
            </div>

            {/* image uploading */}

            <button
              type="submit"
              onClick={handleCreate}
              className="btn btn-success mt-3"
            >
              Create Blogs
            </button>

            <div className="col-md-9 ">
              <h1 className="text-center">All Blogs List</h1>
              <div className="d-flex flex-wrap">
                {blogs?.map((p) => (
                  <Link
                    key={p._id}
                    // to={`/dashboard/admin/banner/${p.slug}`}
                    className="product-link"
                  >
                    <div className="card m-2" style={{ width: "18rem" }}>
                      <img
                        src={p.photo}
                        className="card-img-top"
                        height={"150px"}
                        alt={p.title}
                      />
                      <div className="card-body">
                        <h5 className="card-title">Name: {p.title}</h5>
                        <p>{p.name}</p>
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
