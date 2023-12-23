import React from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";

export default function Thanks() {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="mx-auto pt-3 w-50">
        <p className="display-5 fw-bold">Thanks For Shopping</p>

        <button onClick={() => navigate("/")} className="btn btn-primary">
          {" "}
          Continue Shopping
        </button>

        <br />
        <button
          onClick={() => navigate("/dashboard/user")}
          className="btn btn-dark mt-3"
        >
          {" "}
          Go to Dashboard{" "}
        </button>
      </div>
    </Layout>
  );
}
