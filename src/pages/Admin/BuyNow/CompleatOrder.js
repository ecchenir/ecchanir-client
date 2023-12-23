import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";

import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import AdminMenu from "../../../components/Layout/AdminMenu";

export default function CompleatOrder() {
  const { id } = useParams(); // Correctly extract 'id' from the URL parameters
  const [order, setOrder] = useState({});
  console.log(id);

  // const getAllProducts = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `https://new-ecchanir-server.vercel.app/api/v1/order/get-orders/${id}`
  //     );
  //     setOrder(data.product);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://new-ecchanir-server.vercel.app/api/v1/order/get-orders/${id}`
        );
        setOrder(data?.product || {});
        console.log(data);
        // Use optional chaining to handle undefined data
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(); // Invoke the fetchData function
  }, [id]);

  console.log(order);

  // oder  confirm functionality

  // const handleConfirm = async (id) => {
  //   // console.log(_id);

  //   try {
  //     const data = { status: "complete" };
  //     console.log("Button clicked");
  //     const updateOrder = await axios.put(
  //       `https://new-ecchanir-server.vercel.app/api/v1/order/update-order/${id}`,
  //       data
  //     );
  //     // navigate(`/dashboard/admin/compleatOrder/${_id}`);
  //     console.log("Axios Response", updateOrder);
  //   } catch (error) {
  //     console.error("Error updating data", error);
  //   }
  // };

  // oder delete functionality
  // const handleCancel = async (id) => {
  //   // console.log(_id);

  //   try {
  //     const data = { status: "cancel" };
  //     // console.log("Button clicked");
  //     const updateOrder = await axios.put(
  //       `https://new-ecchanir-server.vercel.app/api/v1/order/update-order/${id}`,
  //       data
  //     );
  //     // navigate(`/dashboard/admin/compleatOrder/${_id}`);
  //     console.log("Axios Response", updateOrder);
  //   } catch (error) {
  //     console.error("Error updating data", error);
  //   }
  // };

  // console.log(order);

  // useEffect(() => {
  //   getAllProducts();
  // }, [id]); // Add 'id' as a dependency to the useEffect hook

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <p className="text-center fw-bold  mt-5"> Order Details</p>

            <Card className="mx-auto">
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
                  <tr>
                    <td>Division </td>
                    <td>: {order.selectedDistrict}</td>
                  </tr>
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
              <div className="d-flex justify-content-between px-2 pb-3">
                <Button
                  variant="danger"
                  // onClick={() => handleConfirm(order.id)}
                >
                  Cancel
                </Button>

                <Button
                  variant="success"
                  // onClick={() => handleCancel(order._id)}
                >
                  Confirm
                </Button>
              </div>

              {/* <div className="d-flex justify-content-end mb-3">
<Link to="/dashboard/admin/orders" className="btn btn-dark">
  Check Other Orders
</Link>
</div> */}
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
