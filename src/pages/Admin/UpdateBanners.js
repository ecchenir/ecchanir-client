import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBanners = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [file, setFile] = useState();

  console.log(params.name);
  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://new-ecchanir-server.vercel.app/api/v1/banner/get-banner/${params.name}`
      );
      // console.log(data);
      setName(data.product.name);
      setId(data.product._id);
      setPhoto(data.product.photo);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  function handleImage(event) {
    setFile(event.target.files[0]);
    setImageURL(URL.createObjectURL(event.target.files[0]));
  }

  //create product function
  const handleUpdate = async (e) => {
    if (!file) {
      console.error("Please select an image");
      toast.error("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ddlqhzgu");
    formData.append("api_key", "938218558923326");

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
      productData.append("photo", imageUploadResult.secure_url);

      const { data } = axios.put(
        `https://new-ecchanir-server.vercel.app/api/v1/banner/update-banner/${id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin");
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
        `https://new-ecchanir-server.vercel.app/api/v1/banner/delete-banner/${id}`
      );
      toast.success("Product Deleted Successfully");
      navigate("/dashboard/admin");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
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
              <div className="mb-3">
                <div className="text-center">
                  <img
                    src={photo}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              </div>
              <div className="mb-3">
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
                <button className="btn btn-success" onClick={handleUpdate}>
                  UPDATE Banner
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE Banner
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateBanners;
