import React, { useState } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import DistrictSelector from "./DistrictSelector";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [quantities, setQuantities] = useState({});
  const [names, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [selectedDistrict, setSelectedDistrict] = useState("");

  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price * (quantities[item._id] || 1);
      });
      return total;
    } catch (error) {
      console.log(error);
    }
  };
  //delete item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // dalevary charge
  const deliveryCharge = selectedDistrict.toLowerCase() === "dhaka" ? 60 : 130;

  // total with dalevary charge
  const totalWithDelivery = totalPrice() + deliveryCharge;

  // increment/decrement quantity
  const incrementQuantity = (pid) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [pid]: (prevQuantities[pid] || 1) + 1,
    }));
  };

  const decrementQuantity = (pid) => {
    if (quantities[pid] > 1) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [pid]: prevQuantities[pid] - 1,
      }));
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : " Your Cart Is Empty"}
            </h4>
          </div>
        </div>
        <p>Cart Summary</p>
        <div className="row">
          <div style={{ wordSpacing: 1, lineHeight: 1 }} className="">
            {cart?.map((p) => (
              <div
                key={p._id}
                className="d-flex mb-3 lg:p-5 p-2 align-items-center justify-content-between bg-light "
              >
                {/* product image */}
                <div>
                  <img
                    src={`https://new-ecchanir-server.vercel.app/api/v1/product/product-photo/${p._id}`}
                    className="cart-image"
                    alt={p.name}
                    width="100px"
                    height={"100px"}
                  />
                </div>

                {/* product details */}
                <div className="w-50">
                  <p>{p.name}</p>
                  <p>Size: M</p>
                  <p className="price mb-2">
                    {p.price * (quantities[p._id] || 1)} Taka
                  </p>

                  {/* quantity control */}

                  <div className="border  d-flex justify-content-between px-2 pt-2  ">
                    <p onClick={() => decrementQuantity(p._id)}>-</p>
                    <p
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                      className=""
                    >
                      {quantities[p._id] || 1}
                    </p>
                    <p onClick={() => incrementQuantity(p._id)}>+</p>
                  </div>
                </div>

                {/* action */}
                <div>
                  <button
                    className="btn btn-danger ms-1"
                    onClick={() => removeCartItem(p._id)}
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Summary */}

        <div className="container border">
          <p className="text-center">Check Out</p>
          <div className="table-responsive-sm">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Product Name</th>
                  {/* <th scope="col"> : {orderData.price} </th> */}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Delivery Charge</td>
                  <td>: {deliveryCharge}</td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td> : {totalWithDelivery}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div>
            <h2 className="text-center text-success">Delivery Information</h2>
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
                  setSelectedDistrict={setSelectedDistrict}
                  selectedDistrict={selectedDistrict}
                />
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
          <div className="d-flex mt-2 justify-content-end">
            <button className="btn btn-success">Order Now</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
