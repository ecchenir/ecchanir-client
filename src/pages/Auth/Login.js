import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  //form function

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://new-ecchanir-server.vercel.app/api/v1/auth/login",
        {
          email,
          password,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title="Login-Eccha-Nir">
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <h2 className="title">Login</h2>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword"
              placeholder="Enter Your Password"
              required
            />
          </div>

          {/* <div className="mb-3">
            <button type="button" className="btn btn-primary"
              onClick={() => { navigate('/forgot-password') }}
            >Forgot Password</button>
          </div> */}

          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <p className="d-flex justify-content-end mt-2 decoration-none">
            <a href="/forgot-password">Forgot Password </a>
          </p>
          <p>
            I have no Account <a href="/register"> please Register</a>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
