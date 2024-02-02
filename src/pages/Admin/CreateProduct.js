import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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
  const [discount, setDiscount] = useState("");
  const [productNumber, setProductNumber] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = ["S", "M", "L", "XL", "XXL"];
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [file, setFile] = useState();
  const [imageUrl, setImageURL] = useState(null);

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "https://new-ecchanir-server.vercel.app/api/v1/category/get-allcategory"
      );
      setCategories(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  function handleImage(event) {
    setFile(event.target.files[0]);
    setImageURL(URL.createObjectURL(event.target.files[0]));
  }

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
    // Validate required fields
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !selectedSubcategory ||
      !discount ||
      !selectedOptions ||
      !productNumber
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("photo", result.secure_url);
      productData.append("category", category);
      productData.append("selectedSubcategory", selectedSubcategory);
      productData.append("discount", discount);
      productData.append("selectedOptions", JSON.stringify(selectedOptions));
      productData.append("productNumber", productNumber);
      // console.log(productData);
      const { data } = await axios.post(
        "https://new-ecchanir-server.vercel.app/api/v1/product/create-product",
        productData
      );

      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
        // Clear form fields
        // setName("");
        // setDescription("");
        // setPrice("");
        // setCategory("");
        // setQuantity("");
        // setPhoto("");
        // setDiscount("");
        // setRating("");
        // setProductNumber("");
        // setSelectedOptions([]);
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
  console.log(description);
  // console.log(selectedCategory);
  // console.log(subcategories);
  // console.log(selectedSubcategory);
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
              {/* image */}

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
                <CKEditor
                  editor={ClassicEditor}
                  onReady={(editor) => {}}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setDescription(data); // Assuming you have state for shortDescription
                  }}
                />

                {/* <textarea
                  type="text"
                  value={description}
                  placeholder="Write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                  required
                /> */}
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
                  {/* <div>
                    <h4>Selected Size:</h4>
                    <p>{selectedOptions.join(", ")}</p>
                  </div> */}
                </div>
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Write a Price"
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
                  type="text"
                  value={productNumber}
                  placeholder="Product code"
                  className="form-control"
                  onChange={(e) => setProductNumber(e.target.value)}
                  required
                />
              </div>

              <label htmlFor=""> Select Category</label>
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setSelectedCategory(value);
                  setCategory(value);
                  // Fetch and set subcategories based on the selected category
                  const selectedCategoryData = categories.find(
                    (cat) => cat._id === value
                  );
                  setSubcategories(selectedCategoryData?.subCategory || []);
                  setSelectedSubcategory(""); // Reset selected subcategory when category changes
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <label htmlFor=""> Select Sub Category</label>
              <Select
                bordered={false}
                placeholder="Select Subcategory"
                size="large"
                showSearch
                className="form-select mb-3"
                value={selectedSubcategory}
                onChange={(value) => setSelectedSubcategory(value)}
              >
                {subcategories.map((subcat) => (
                  <Option key={subcat} value={subcat}>
                    {subcat}
                  </Option>
                ))}
              </Select>

              {imageUrl && ( // Display the image only when imageURL is not empty
                <div item xs={12}>
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
              <div item xs={6}>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  id=""
                  onChange={handleImage}
                />
              </div>

              <div className="mb-3 d-flex justify-content-end">
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
