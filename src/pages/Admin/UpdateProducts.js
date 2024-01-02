import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProducts = () => {
  const [file, setFile] = useState();
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");
  const [discount, setDiscount] = useState("");
  const [productNumber, setProductNumber] = useState("");
  const [imageURL, setImageURL] = useState("");

  function handleImage(event) {
    setFile(event.target.files[0]);
    setImageURL(URL.createObjectURL(event.target.files[0]));
  }

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://new-ecchanir-server.vercel.app/api/v1/product/get-product/${params.slug}`
      );
      // console.log(data.product);
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setPhoto(data.product.photo);
      setDiscount(data.product.discount);
      setProductNumber(data?.product?.productNumber);
      setCategory(data.product.category._id);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  // console.log(productNumber);
  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "https://new-ecchanir-server.vercel.app/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
        // console.log(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleUpdate = async (e) => {
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
    const imageUploadResult = await response.json();
    console.log("Image uploaded:", imageUploadResult.secure_url);

    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("productNumber", productNumber);
      productData.append("discount", discount);
      photo && productData.append("photo", imageUploadResult.secure_url);

      const { data } = axios.put(
        `https://new-ecchanir-server.vercel.app/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `https://new-ecchanir-server.vercel.app/api/v1/product/delete-product/${id}`
      );
      toast.success("Product Deleted Successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // trendind product
  const handleConfirm = async (id) => {
    console.log(id);
    try {
      const data = { productType: "trending" };
      console.log("Button clicked");
      const updateProduct = await axios.put(
        `https://new-ecchanir-server.vercel.app/api/v1/product/trending/${id}`,
        data
      );

      console.log("Axios Response", updateProduct);
      navigate(`/dashboard/admin/products`);
    } catch (error) {
      console.error("Error updating data", error);
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <div>
                {/* <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label> */}
              </div>
              {/* <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`https://new-ecchanir-server.vercel.app/api/v1/product/product-photo/${id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div> */}

              {imageURL && ( // Display the image only when imageURL is not empty
                <div className="mb-3">
                  <p className="text-xl"> New Photo</p>
                  <img
                    src={imageURL}
                    alt="Uploaded"
                    placeholder="photo"
                    height={200}
                    className="h-40 w-40 border-2"
                    style={{ maxWidth: "100%" }}
                  />
                </div>
              )}

              <div className="mb-3">
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  id=""
                  onChange={handleImage}
                />
              </div>

              <div className="mb-3">
                <img height={200} src={photo} alt="" />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="Write a Description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={discount}
                  placeholder="write a discount Price"
                  className="form-control"
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  value={productNumber}
                  placeholder="write a product Number"
                  className="form-control"
                  onChange={(e) => setProductNumber(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <button className="btn btn-success" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
              <div className="mb-3">
                <Button variant="success" onClick={() => handleConfirm(id)}>
                  Create a tending Product
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProducts;
