import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CategoryForm from "../../components/Form/CategoryForm";

import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  // const [value, setValue] = useState('');
  const [photo, setPhoto] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [file, setFile] = useState();
  const [imageUrl, setImageURL] = useState(null);

  const navigate = useNavigate();

  function handleImage(event) {
    setFile(event.target.files[0]);
    setImageURL(URL.createObjectURL(event.target.files[0]));
  }

  //handle Form
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

      const { data } = axios.post(
        "https://new-ecchanir-server.vercel.app/api/v1/category/create-category",
        productData
      );

      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success(" Category Created Successfully");
        // navigate("/dashboard/admin/banners");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

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

  //update category

  const handleUpdate = async (e) => {
    try {
      const { data } = await axios.put(
        `https://new-ecchanir-server.vercel.app/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Somtihing went wrong");
    }
  };

  //delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `https://new-ecchanir-server.vercel.app/api/v1/category/delete-category/${pId}`
      );
      if (data?.success) {
        toast.success(`category is deleted`);

        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Sometihing went wrong");
    }
  };

  // console.log(parentCategoryId);

  const handleCreateSubcategory = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `https://new-ecchanir-server.vercel.app/api/v1/category/create-subcategory/${parentCategoryId}`,
        { name: subcategory }
      );

      if (data?.success) {
        toast.success("Subcategory Created Successfully");
        navigate("/dashboard/admin");
      } else {
        toast.error(data?.message || "Error creating subcategory");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard-Create Category"}>
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
                placeholder="Create New Category"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {/* image uploading */}

            {/* image showing */}
            {/* <div className="mb-3">
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
            </div> */}

            <div className="mb-3">
              <input
                type="file"
                accept="image/*"
                name="image"
                id=""
                onChange={handleImage}
              />
            </div>

            {imageUrl && ( // Display the image only when imageURL is not empty
              <div>
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  placeholder="photo"
                  height={"200px"}
                  className="h-40 w-40 border-2"
                  style={{ maxWidth: "100%" }}
                />
              </div>
            )}

            <button
              type="submit"
              onClick={handleCreate}
              className="btn btn-success mt-3"
            >
              Submit
            </button>

            {/* Handle create Sub Category  */}

            <p className="mt-5 text-center"> Create Sub Category</p>
            <div className="mb-3">
              <select
                value={parentCategoryId}
                onChange={(e) => setParentCategoryId(e.target.value)}
                className="form-select"
              >
                <option value="">Select Parent Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Write Sub Category Name"
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                />
              </div>

              <button
                type="submit"
                onClick={handleCreateSubcategory}
                className="btn btn-success mt-2"
              >
                Sub Category
              </button>
            </div>

            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          {/* <button className="btn btn-success ms-2" onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}>Edit</button> */}
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(c._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
