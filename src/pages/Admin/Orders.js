import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { Badge } from "react-bootstrap";

const Orders = () => {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "https://new-ecchanir-server.vercel.app/api/v1/order/get-order"
      );
      setProducts(data.product);
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  const reversedProduct = [...products].reverse();

  // console.log(products);

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="container-fluid m-3 px-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9 ">
            <Table responsive="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Customer Name</th>
                  <th>Phone</th>
                  <th> Division </th>
                  <th>District</th>
                  <th>OrderNumber</th>

                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {reversedProduct?.map((product, index) => (
                  <tr
                    key={index}
                    onClick={() =>
                      navigate(`/dashboard/admin/compleatOrder/${product._id}`)
                    }
                  >
                    <td>{index + 1}</td>
                    <td>{product.names}</td>
                    <td>{product.phone}</td>
                    <td>{product.selectedDivision}</td>
                    <td>{product.selectedDistrict}</td>
                    <td className="text-uppercase text-danger">
                      EN{product._id.slice(-6)}
                    </td>

                    <td align="center">
                      <Badge
                        bg={
                          product.status === "pending"
                            ? "secondary"
                            : product.status === "cancel"
                            ? "danger"
                            : "success"
                        }
                      >
                        {" "}
                        {product.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
