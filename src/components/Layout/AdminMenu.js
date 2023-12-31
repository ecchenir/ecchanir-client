import { NavLink } from "react-router-dom";
import { Badge } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";

const AdminMenu = () => {
  const [products, setProducts] = useState([]);

  const trendingProduct = products.filter((item) => item.status === "pending");

  // console.log(trendingProduct);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "https://new-ecchanir-server.vercel.app/api/v1/order/get-order"
      );
      setProducts(data.product);
      // console.log(data);
    } catch (error) {
      console.log(error);
      // toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <div className="text-center ">
        <div className="list-group ">
          <h2>Admin Panel</h2>
          <NavLink
            to="/dashboard/admin/orders"
            className="list-group-item list-group-item-action rounded-1 mt-2"
          >
            <Badge className="m-2 p-2" count={trendingProduct.length} showZero>
              Orders List
            </Badge>
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action rounded-1 mt-2"
          >
            Create Product
          </NavLink>

          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item list-group-item-action rounded-1 mt-2"
          >
            Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-latestproduct"
            className="list-group-item list-group-item-action rounded-1 mt-2"
          >
            Create LatestProduct
          </NavLink>

          <NavLink
            to="/dashboard/admin/latestproducts"
            className="list-group-item list-group-item-action rounded-1 mt-2"
          >
            Latest Products
          </NavLink>

          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action rounded-1 mt-2"
          >
            Create Category
          </NavLink>

          <NavLink
            to="/dashboard/admin/create-banner"
            className="list-group-item list-group-item-action  "
          >
            Create Banner
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-blogs"
            className="list-group-item list-group-item-action rounded-1 mt-2"
          >
            {" "}
            Create Blogs
          </NavLink>

          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action rounded-1 mt-2"
          >
            Users List
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
