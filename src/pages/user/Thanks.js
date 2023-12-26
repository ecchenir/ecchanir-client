import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Badge } from "react-bootstrap";

export default function Thanks() {
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

  console.log(order);

  return (
    <Layout>
      <div className="container">
        <div>
          <p className="text-center fw-bold display-6  mt-5"> Order Details</p>
          <p className="text-uppercase text-danger text-center d-flex justify-content-center gap-2">
            <span> Order Id: </span> <p>EN{id.slice(-6)} </p>
          </p>

          <Card className="mx-auto">
            <table class="table">
              <thead>
                <tr>
                  <td>Status</td>

                  <td>
                    :{" "}
                    <Badge
                      bg={
                        order.status === "pending"
                          ? "secondary"
                          : order.status === "cancel"
                          ? "danger"
                          : "success"
                      }
                    >
                      {" "}
                      {order.status}
                    </Badge>
                  </td>
                </tr>
                <tr>
                  <th scope="col">Your Name</th>
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
                  <td>Create Order Time</td>
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
          </Card>
        </div>

        {/* <div className="d-flex w-100 justify-content-center mb-3">
          <img
            style={{ objectFit: "contain", width: "50%" }}
            src="/ecchenir.jpg"
            alt=""
          />
        </div> */}
        <div>
          <p className="display-6 mt-5 text-center">Thanks for Shopping</p>
        </div>
        <div className="text-center mb-3">
          <button onClick={() => navigate("/")} className="btn btn-success">
            Continue Shopping
          </button>
        </div>
      </div>
    </Layout>
  );
}
