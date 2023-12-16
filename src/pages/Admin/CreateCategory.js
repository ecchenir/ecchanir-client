import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
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

  //handle Form
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      // console.log(productData);
      productData.append("name", name);
      productData.append("photo", photo);
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
        "https://new-ecchanir-server.vercel.app/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
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

  // Handle Create subCategory
  const handleCreateSubcategory = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `https://new-ecchanir-server.vercel.app/api/v1/category/${parentCategoryId}/create-subcategory`,
        { name: subcategory }
      );

      if (data?.success) {
        toast.success("Subcategory Created Successfully");
        getAllCategory();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
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
                  placeholder="Create Subcategory"
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                />
              </div>

              <button
                type="submit"
                onClick={handleCreateSubcategory}
                className="btn btn-success mt-2"
              >
                Submit Subcategory
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
