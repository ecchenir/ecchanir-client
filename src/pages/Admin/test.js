import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DistrictSelector from "./DistrictSelector";

import Table from "react-bootstrap/Table";
import axios from "axios";
import CartItem from "./CartItem";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [names, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    let updatedCart = [];
    cart.map((item) => {
      updatedCart = [...updatedCart, { ...item, quantity: 1 }];
    });
    setProducts(updatedCart);
  }, [cart]);

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      products?.map((item) => {
        total = total + item.price * (quantities[item._id] || 1);
      });
      return total;
    } catch (error) {
      console.log(error);
    }
  };

  // dalevary charge
  const deliveryCharge = selectedDistrict.toLowerCase() === "dhaka" ? 60 : 130;

  // total with dalevary charge
  const totalWithDelivery = totalPrice() + deliveryCharge;

  // handle create order
  const handleCreateOrder = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        names,
        phone,
        address,
        selectedDistrict,
        selectedDivision,
        totalWithDelivery,
        deliveryCharge,
        products,
        subTotal,
      };
      // console.log(productData);
      try {
        const response = await axios.post(
          "https://new-ecchanir-server.vercel.app/api/v1/order/create-order",
          productData
        );
        toast.success("Thanks For Shopping");
        navigate("/thanks");
        localStorage.removeItem("cart");
        // console.log(response.data);
      } catch (error) {
        console.error("Error creating order:", error);
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error preparing order data:", error);
      toast.error("Something went wrong");
    }
  };

  const subTotal = totalWithDelivery - deliveryCharge;
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {products?.length
                ? `You Have ${products.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : " Your Cart Is Empty"}
            </h4>
          </div>
        </div>
        {products.length > 0 && (
          <div>
            <p className="text-center display-6">Cart Summary</p>
            <div className="row">
              <div style={{ wordSpacing: 1, lineHeight: 1 }} className="">
                {products?.map((product) => (
                  <CartItem
                    setProducts={setProducts}
                    products={products}
                    product={product}
                    setQuantities={setQuantities}
                  />
                ))}
              </div>
            </div>

            {/* Cart Summary */}

            <div className="container border">
              <p className="text-center display-5 pt-3  fw-bold">
                Order Summary
              </p>

              <Table responsive="lg">
                <tbody>
                  <tr></tr>
                  <tr>
                    <td className="fw-medium">Sub Total</td>
                    <td>
                      <td className="fw-medium">
                        : {totalWithDelivery - deliveryCharge}
                      </td>
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
                    <td className="fw-medium">: {totalWithDelivery}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div>
              <div>
                <h2 className="text-center text-success mt-3">
                  Delivery Information
                </h2>
                <div className="m-2   w-100">
                  <div className="mb-3">
                    <input
                      type="text"
                      value={names}
                      placeholder="Write a name"
                      className="form-control border-2 border-black"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="number"
                      value={phone}
                      placeholder="Write a phone"
                      className="form-control border-2 border-black"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div>
                    <DistrictSelector
                      selectedDistrict={selectedDistrict}
                      setSelectedDistrict={setSelectedDistrict}
                      selectedDivision={selectedDivision}
                      districts={districts}
                      setDistricts={setDistricts}
                      setSelectedDivision={setSelectedDivision}
                      divisions={divisions}
                      setDivisions={setDivisions}
                    />
                  </div>

                  <div className="mb-3 mt-2">
                    <textarea
                      type="text"
                      value={address}
                      placeholder="Write a address"
                      className="form-control border-2 border-black"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex mt-2 justify-content-center mb-3">
                <button
                  className="btn btn-success  w-100"
                  onClick={handleCreateOrder}
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        )}
        {products.length === 0 && (
          <div className="text-center mt-3">
            <p>No items added to the cart.</p>
            <button className="btn btn-primary" onClick={() => navigate("/")}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
