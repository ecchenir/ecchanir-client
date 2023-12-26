import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Register from "./pages/Auth/Register";
import Contact from "./pages/Contact";
import HomePage from "./pages/HomePage";
import Pagenotfound from "./pages/Pagenotfound";
import Policy from "./pages/Policy";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import AdminRoute from "./components/Routes/AdminRoute";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import CreateBanner from "./pages/Admin/CreateBanner";
import Users from "./pages/Admin/Users";
// import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Products from "./pages/Admin/Products";
import Orders from "./pages/Admin/Orders";
import Banners from "./pages/Admin/blogs";
import UpdateProducts from "./pages/Admin/UpdateProducts";
import UpdateBanners from "./pages/Admin/UpdateBanners";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";
import CreateOrder from "./pages/CreateOrder";
import UpdateOrders from "./pages/Admin/UpdateOrders";
import OrdersShow from "./pages/user/OrdersShow";
import CreateLatestproduct from "./pages/Admin/CreateLatestproduct";
import Latestproducts from "./pages/Admin/Latestproducts";
import UpdateLatestproducts from "./pages/Admin/UpdateLatestproducts";
import LatestProductDetails from "./pages/LatestProductDetails";
import Blogs from "./pages/Blogs";
import BuyNow from "./pages/Admin/BuyNow/BuyNow";
import CompleatOrder from "./pages/Admin/BuyNow/CompleatOrder";
import { useEffect } from "react";
import axios from "axios";
import SubcategoryShow from "./pages/SubcategoryShow";
import Thanks from "./pages/user/Thanks";
import CreateBloogs from "./pages/Admin/CreateBloogs";

function App() {
  // useEffect(() => {
  //   axios.defaults.baseURL = "https://new-ecchanir-server.vercel.app";
  // }, []);
  useEffect(() => {
    axios.defaults.baseURL = "http://localhost:5000";
  }, []);
  // "proxy": "http://localhost:2000"

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Adds smooth scrolling animation
    });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        {/* <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/product/:slug" element={<ProductDetails />} /> */}

        <Route path="/latestproduct/:id" element={<LatestProductDetails />} />
        {/* <Route path="/latestproduct/:slug" element={<LatestProductDetails />} /> */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/CreateOrder" element={<CreateOrder />} />
        <Route path="/buyNow" element={<BuyNow />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/subcategory/:name" element={<SubcategoryShow />} />

        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          {/* <Route path="user/orders"  element={<Orders/>}/> */}
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orderShow" element={<OrdersShow />} />
          <Route path="user" element={<Dashboard />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route
            path="admin/create-latestproduct"
            element={<CreateLatestproduct />}
          />
          <Route path="admin/create-banner" element={<CreateBanner />} />
          <Route path="admin/create-blogs" element={<CreateBloogs />} />

          <Route path="admin/product/:slug" element={<UpdateProducts />} />
          <Route
            path="admin/latestproduct/:slug"
            element={<UpdateLatestproducts />}
          />
          <Route path="admin/compleatOrder/:id" element={<CompleatOrder />} />
          <Route path="admin/banner/:slug" element={<UpdateBanners />} />
          <Route path="admin/order/:slug" element={<UpdateOrders />} />

          <Route path="admin/products" element={<Products />} />
          <Route path="admin/latestproducts" element={<Latestproducts />} />
          <Route path="admin/orders" element={<Orders />} />
          <Route path="admin/banners" element={<Banners />} />
          <Route path="admin/users" element={<Users />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/thanks/:id" element={<Thanks />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
