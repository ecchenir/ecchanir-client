import React, { useState } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DistrictSelector from "./DistrictSelector";
import { MdDelete } from "react-icons/md";
import Table from "react-bootstrap/Table";
import { Axios } from "axios";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [quantities, setQuantities] = useState({});
  const [names, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [selectedDivision, setSelectedDivision] = useState("");
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

  // handle create order

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("names", names);
      productData.append("phone", phone);
      productData.append("address", address);
      // productData.append("size", size);
      productData.append("quantities", quantities);
      // productData.append("productNumber", orderData.productNumber);
      productData.append("selectedDivision", selectedDivision);
      productData.append("selectedDistrict", selectedDistrict);
      // productData.append("amount", orderData.price);
      productData.append("delivery", deliveryCharge);
      //   productData.append('photo',   );
      // productData.append("total", calculateTotalAmount());

      const { data } = await Axios.post(
        "https://new-ecchanir-server.vercel.app/api/v1/order/create-order",
        productData
      );
      if (data?.success) {
        toast.success(data?.message);
        navigate("/thanks");
      } else {
        toast.success("SuccessFully Create order ,Thanks For Shopping");
      }
    } catch (error) {
      //   console.log(error);
      toast.error("Something went wrong");
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
                    <p className="btn" onClick={() => decrementQuantity(p._id)}>
                      -
                    </p>
                    <p
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                      className=""
                    >
                      {quantities[p._id] || 1}
                    </p>
                    <p className="btn" onClick={() => incrementQuantity(p._id)}>
                      +
                    </p>
                  </div>
                </div>

                {/* action */}
                <div>
                  <button
                    className="btn ms-1"
                    onClick={() => removeCartItem(p._id)}
                  >
                    <MdDelete style={{ fontSize: "18px" }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Summary */}

        <div className="container border">
          <p className="text-center display-5 pt-3  fw-bold">Order Summary</p>

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
            <button
              className="btn btn-success px-5"
              onClick={handleCreateOrder}
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
