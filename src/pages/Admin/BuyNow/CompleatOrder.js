import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import AdminMenu from "../../../components/Layout/AdminMenu";

export default function CompleatOrder() {
  const { id } = useParams(); // Correctly extract 'id' from the URL parameters
  const [order, setOrder] = useState({});
  const [Product, setProduct] = useState([]);
  const navigate = useNavigate();

  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://new-ecchanir-server.vercel.app/api/v1/order/get-orders/${id}`
        );
        setOrder(data?.SingleProduct);
        setProduct(data.SingleProduct.products || []);
        // Use optional chaining to handle undefined data
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(); // Invoke the fetchData function
  }, [id]);

  console.log(Product);

  // oder  confirm functionality
  const handleConfirm = async (id) => {
    try {
      const data = { status: "complete" };
      console.log("Button clicked");
      const updateOrder = await axios.put(
        `https://new-ecchanir-server.vercel.app/api/v1/order/update-order/${id}`,
        data
      );

      console.log("Axios Response", updateOrder);
      navigate(`/dashboard/admin/orders`);
    } catch (error) {
      console.error("Error updating data", error);
    }
  };

  // oder delete functionality

  const handleCancel = async (id) => {
    try {
      const data = { status: "cancel" };
      // console.log("Button clicked");
      const updateOrder = await axios.put(
        `https://new-ecchanir-server.vercel.app/api/v1/order/update-order/${id}`,
        data
      );
      console.log("Axios Response", updateOrder);
      navigate(`/dashboard/admin/orders`);
    } catch (error) {
      console.error("Error updating data", error);
    }
  };

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <p className="text-center fw-bold display-6  mt-5">
              {" "}
              Order Details
            </p>
            <p className="text-uppercase text-danger text-center d-flex justify-content-center gap-2">
              <span> Order Id: </span> <p>EN{id.slice(-6)} </p>
            </p>

            <Card className="mx-auto">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Customer Name</th>
                    <th scope="col"> : {order?.names} </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="fw-medium">Phone</td>
                    <td>: {order?.phone}</td>
                  </tr>
                  <tr>
                    <td>Division </td>
                    <td>: {order?.selectedDistrict}</td>
                  </tr>
                  <tr>
                    <td>District </td>
                    <td>: {order?.selectedDistrict}</td>
                  </tr>
                  <tr>
                    <td>Address </td>
                    <td>: {order?.address}</td>
                  </tr>
                  <tr>
                    <td>Order Date </td>
                    <td>: {new Date(order.createdAt).toLocaleString()}</td>
                  </tr>

                  <tr>
                    <td> Shaping Charge </td>
                    <td>: {order?.deliveryCharge}</td>
                  </tr>

                  <tr>
                    <td>Total Amount </td>
                    <td>: {order?.subTotal}</td>
                  </tr>
                  <tr>
                    <td>Total Payable Amount </td>
                    <td>: {order?.totalWithDelivery}</td>
                  </tr>
                </tbody>
              </table>

              <div className="container">
                <p className="display-6 text-center">Order Summary</p>

                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">SL</th>
                      <th scope="col">Product Code</th>
                      <th scope="col">Size</th>
                      <th scope="col">Quantity</th>
                      <th scope="col"> Price</th>
                    </tr>
                  </thead>
                  {Product.map((p, index) => (
                    <tbody key={index}>
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{p.productNumber}</td>
                        <td>{p.selectedSize}</td>
                        <td>{p.quantity}</td>
                        <td>{p.price}</td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>

              <div className="d-flex justify-content-between px-2 pb-3">
                <Button
                  variant="danger"
                  onClick={() => handleCancel(order._id)}
                >
                  Cancel
                </Button>

                <Button
                  variant="success"
                  onClick={() => handleConfirm(order._id)}
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
