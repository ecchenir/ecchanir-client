import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import Axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import DistrictSelector from "../../DistrictSelector";

export default function BuyNow() {
  const navigate = useNavigate();
  const [names, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [orderData, setOrderData] = useState([]);
  const [quantities, setQuantities] = useState(1);
  const [size, setSizes] = useState();

  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");

  useEffect(() => {
    // Fetch order data from local storage
    const existingOrderData =
      JSON.parse(localStorage.getItem("orderData")) || [];
    const latestData = existingOrderData[existingOrderData.length - 1];
    // console.log(existingOrderData);
    setOrderData(latestData.product);
    setSizes(latestData.selectedSize);
  }, []);
  //   console.log(orderData);

  //   const productNumber = orderData.productNumber;
  //   console.log(productNumber);
  const deliveryCharge = selectedDistrict.toLowerCase() === "dhaka" ? 60 : 130;

  const calculateTotalAmount = () => {
    const itemTotal = orderData.price * quantities;
    const deliveryChargeAmount = quantities >= 3 ? 0 : deliveryCharge;
    return itemTotal + deliveryChargeAmount;
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("names", names);
      productData.append("phone", phone);
      productData.append("address", address);
      productData.append("size", size);
      productData.append("quantities", quantities);
      productData.append("productNumber", orderData.productNumber);
      productData.append("selectedDistrict", selectedDistrict);
      productData.append("amount", orderData.price);
      productData.append("delivery", deliveryCharge);
      //   productData.append('photo',   );
      productData.append("total", calculateTotalAmount());

      const { data } = await Axios.post(
        "https://new-ecchanir-server.vercel.app/api/v1/order/create-order",
        productData
      );
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.success("SuccessFully Create order ,Thanks For Shopping");
        // navigate("/dashboard/admin/orders");
      }
    } catch (error) {
      //   console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Increase and decrease quantity
  const handleIncrease = () => {
    setQuantities((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantities > 1) {
      setQuantities((prevQuantity) => prevQuantity - 1);
    }
  };

  //   console.log(orderData);

  return (
    <Layout>
      <div>
        <div className="border container">
          <p className="text-center display-5 pt-3  fw-bold">Order Summary</p>
          <table class="table">
            <thead>
              <tr>
                <img
                  height={100}
                  className="brand-image"
                  src={`https://new-ecchanir-server.vercel.app/api/v1/product/product-photo/${orderData._id}`}
                  alt=""
                />
              </tr>
              <tr>
                <th scope="col">Product Name</th>
                <th scope="col" style={{ whiteSpace: "nowrap" }}>
                  {" "}
                  : {orderData.slug}{" "}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="fw-medium bg-primary p-5 w-100">Size</td>
                <td style={{ width: "50%" }} className="bg-dark w-100">
                  : {size}
                </td>
              </tr>
              {/* <tr>
                                <td><p>Product Number</p></td>
                                <td><p> : {orderData.productNumber}</p></td>

                            </tr> */}

              <tr>
                <td className="fw-medium ">Quantity</td>
                <p className="border d-flex justify-content-between pt-2 pb-0 ">
                  {" "}
                  <p className="btn" onClick={handleDecrease}>
                    -
                  </p>
                  {quantities}
                  <p className="btn" onClick={handleIncrease}>
                    +
                  </p>
                </p>
              </tr>

              <tr>
                <td>
                  <p className="fw-medium">Price</p>
                </td>
                <td className="fw-medium">
                  <p className="price "> : {orderData.price} Tk</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="fw-medium">Sub Total</p>
                </td>
                <td>
                  <p className="fw-medium">
                    {" "}
                    : {orderData.price * quantities} Tk
                  </p>
                </td>
              </tr>

              <tr>
                <td className="fw-medium">Shipping Charge</td>
                {/* <td>: {selectedDistrict.toLowerCase() === 'dhaka' ? 60 : 130}</td> */}
                <td className="fw-medium">: {deliveryCharge}</td>
                {/* <td>: {(quantities >= 3) ? 0 : (selectedDistrict.toLowerCase() === 'dhaka' ? 60 : 130)}</td> */}
              </tr>

              <tr>
                <td className="fw-medium">Payable Amount</td>
                {/* <td>: {(orderData.price * quantities) + (selectedDistrict.toLowerCase() === 'dhaka' ? 60 : 130)}</td> */}
                {/* <td>: {(orderData.price * quantities) + ((quantities >= 3) ? 0 : (selectedDistrict.toLowerCase() === 'dhaka' ? 60 : 130))}</td> */}
                <td className="fw-medium">: {calculateTotalAmount()}</td>
              </tr>
            </tbody>
            <div className="container-fluid d-flex m-3 p-3">
              <div className="row w-100 ">
                <div>
                  <h2 className="text-center text-success">
                    Delivery Information
                  </h2>
                  <div className="m-2 p-4 w-100">
                    <div className="mb-3">
                      <input
                        type="text"
                        value={names}
                        placeholder="write a name"
                        className="form-control"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="number"
                        value={phone}
                        placeholder="write a phone"
                        className="form-control"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div>
                      <DistrictSelector
                        selectedDistrict={selectedDistrict}
                        setSelectedDistrict={setSelectedDistrict}
                        selectedDivision={selectedDivision}
                        setSelectedDivision={setSelectedDistrict}
                        selectedUpazila={selectedUpazila}
                        setSelectedUpazila={setSelectedUpazila}
                      />

                      {/* <DistrictSelector setSelectedDistrict={setSelectedDistrict} selectedDistrict={selectedDistrict} /> */}
                    </div>

                    <div className="mb-3">
                      <textarea
                        type="text"
                        value={address}
                        placeholder="write a address"
                        className="form-control"
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Table striped="columns">
                <thead>
                  <tr>
                    <th width={75}> {orderData.price}</th>
                    <th> {orderData.price}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td> ggggggggggggggggg</td>
                    <td>Otto</td>
                  </tr>
                  <tr>
                    <td>Jacob</td>
                    <td>Thornton</td>
                  </tr>
                </tbody>
              </Table>
            </div>

            <div className="d-flex mt-2 justify-content-end">
              <button className="btn btn-success" onClick={handleCreateOrder}>
                Order Now
              </button>
            </div>
          </table>
        </div>
      </div>
    </Layout>
  );
}
