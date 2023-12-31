import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateBanner = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [file, setFile] = useState();
  const [imageUrl, setImageURL] = useState(null);

  function handleImage(event) {
    setFile(event.target.files[0]);
    setImageURL(URL.createObjectURL(event.target.files[0]));
  }

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "https://new-ecchanir-server.vercel.app/api/v1/category/get-allcategory"
      );
      setCategories(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
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
      productData.append("photo", result.secure_url);
      productData.append("category", category);
      const { data } = axios.post(
        "https://new-ecchanir-server.vercel.app/api/v1/banner/create-banner",
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Banner Created Successfully");
        // navigate("/dashboard/admin/banners");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "https://new-ecchanir-server.vercel.app/api/v1/banner/get-banner"
      );
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"Dashboard-Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Banner</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              {/* <div className="mb-3">
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
              </div> */}

              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
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

              <div className="mb-3 mt-3">
                <button className="btn btn-success" onClick={handleCreate}>
                  CREATE Banner
                </button>
              </div>
            </div>

            <div className="col-md-9">
              <h1 className="text-center">All Banner List</h1>
              <div className="d-flex flex-wrap">
                {products?.map((p) => (
                  <Link
                    key={p._id}
                    to={`/dashboard/admin/banner/${p.name}`}
                    className="product-link"
                  >
                    <div className="card m-2" style={{ width: "18rem" }}>
                      <img
                        src={p.photo}
                        className="card-img-top"
                        height={"150px"}
                        alt={p.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title"> Title: {p.name}</h5>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateBanner;
