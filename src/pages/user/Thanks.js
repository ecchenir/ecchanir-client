import React from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";

export default function Thanks() {
  const navigate = useNavigate();
  return (
    <Layout>
      <div>
        <div className="d-flex w-100 justify-content-center mb-3">
          <img
            style={{ objectFit: "contain", width: "50%" }}
            src="/ecchenir.jpg"
            alt=""
          />

        
        </div>
        <div>
        <p className="display-6">Thanks for Shopping</p>
        </div>
        <div className="text-center mb-3">
          <button onClick={() => navigate("/")} className="btn btn-dark">
            Continue Shopping
          </button>
        </div>
      </div>
    </Layout>
  );
}
