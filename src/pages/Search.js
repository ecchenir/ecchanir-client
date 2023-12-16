import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
import {  useNavigate } from "react-router-dom";
const Search = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p,index) => (
              <div key={index} className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  height={"250px"}
                  className="card-img-top"
                  alt={p.name}
                  onClick={() => navigate(`/product/${p.slug}`)}
                  
                />
                <div className="card-body">
                <h5 className="card-title">Name: {p.name}</h5>
                    
                    <p className="card-text">Description: {p.description}</p>
                    <p className="card-text">Quantity: {p.quantity}</p>
                    <p className="card-text">Price: {p.price}Taka</p>
                  {/* <button class="btn btn-success ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button> */}
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;