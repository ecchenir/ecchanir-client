import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ReactToPrint from "react-to-print";
import Card from "react-bootstrap/Card";

export default function CompleatOrder() {
  const { id } = useParams(); // Correctly extract 'id' from the URL parameters
  const [order, setOrder] = useState({});
  console.log(id);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `https://new-ecchanir-server.vercel.app/api/v1/order/get-orders/${id}`
      );
      setOrder(data.product);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(order);

  useEffect(() => {
    getAllProducts();
  }, [id]); // Add 'id' as a dependency to the useEffect hook

  return (
    <Layout>
      <p className="text-center fw-bold  mt-5"> Order Details</p>

      <Card className="mx-auto w-75">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Customer Name</th>
              <th scope="col"> : {order.slug} </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="fw-medium">Phone</td>
              <td>: {order.phone}</td>
            </tr>
            <tr></tr>
            <tr>
              <td>District </td>
              <td>: {order.selectedDistrict}</td>
            </tr>
            <tr>
              <td>Address </td>
              <td>: {order.address}</td>
            </tr>
            <tr>
              <td>Order Date </td>
              <td>: {new Date(order.createdAt).toLocaleString()}</td>
            </tr>
            <tr>
              <td>Product Id </td>
              <td>: {order.productNumber}</td>
            </tr>

            <tr>
              <td className="fw-medium">Product Size</td>
              <td>: {order.size}</td>
            </tr>
            <tr>
              <td>Quantities </td>
              <td>: {order.quantities}</td>
            </tr>
            <tr>
              <td> Shaping Charge </td>
              <td>: {order.delivery}</td>
            </tr>

            <tr>
              <td>Total Amount </td>
              <td>: {order.amount}</td>
            </tr>
          </tbody>
        </table>
        <div className="d-flex justify-content-end mb-3">
          <Link to="/dashboard/admin/orders" className="btn btn-dark">
            Check Other Orders
          </Link>
        </div>
      </Card>
    </Layout>
  );
}
