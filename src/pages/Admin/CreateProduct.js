import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const Checkbox = ({ option, onChange }) => (
  <div className="form-check form-check-inline">
    <input
      className="form-check-input"
      type="checkbox"
      id={option}
      value={option}
      onChange={onChange}
    />
    <label className="form-check-label" htmlFor={option}>
      {option}
    </label>
  </div>
);

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [discount, setDiscount] = useState("");
  const [rating, setRating] = useState("");
  const [productNumber, setProductNumber] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = ["M", "L", "XL", "XXL"];

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
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

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    // Validate required fields
    if (!name || !description || !price || !category) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("discount", discount);
      productData.append("selectedOptions", JSON.stringify(selectedOptions));
      productData.append("rating", rating);
      productData.append("productNumber", productNumber);

      const { data } = await axios.post(
        "/api/v1/product/create-product",
        productData
      );

      if (data?.success) {
        toast.success("Product Created Successfully");
        // Clear form fields
        setName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setQuantity("");
        setPhoto("");
        setDiscount("");
        setRating("");
        setProductNumber("");
        setSelectedOptions([]);
        // navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Handle checkbox change
  const handleOptionChange = (e) => {
    const option = e.target.value;
    if (e.target.checked) {
      // If checkbox is checked, add the option to the selectedOptions array
      setSelectedOptions((prevSelectedOptions) => [
        ...prevSelectedOptions,
        option,
      ]);
    } else {
      // If checkbox is unchecked, remove the option from the selectedOptions array
      setSelectedOptions((prevSelectedOptions) =>
        prevSelectedOptions.filter(
          (selectedOption) => selectedOption !== option
        )
      );
    }
  };

  return (
    <Layout title={"Dashboard-Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
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
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3 mt-3">
                <div>
                  <h4>Select Size Options:</h4>
                  {options.map((option) => (
                    <Checkbox
                      key={option}
                      option={option}
                      onChange={handleOptionChange}
                    />
                  ))}
                  <div>
                    <h4>Selected Size:</h4>
                    <p>{selectedOptions.join(", ")}</p>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={discount}
                  placeholder="Discount Price"
                  className="form-control"
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={rating}
                  placeholder="write a Rating"
                  className="form-control"
                  onChange={(e) => setRating(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={productNumber}
                  placeholder="Product code"
                  className="form-control"
                  onChange={(e) => setProductNumber(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <button className="btn btn-success" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
