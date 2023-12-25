import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DistrictSelector from "./DistrictSelector";
import { MdDelete } from "react-icons/md";
import Table from "react-bootstrap/Table";
import { Axios } from "axios";
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
    console.log(cart);
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
      // productData.append("names", names);
      // productData.append("phone", phone);
      // productData.append("address", address);
      // productData.append("quantities", quantities);
      // // productData.append("size", size);
      // // productData.append("productNumber", orderData.productNumber);
      // productData.append("selectedDivision", selectedDivision);
      // productData.append("selectedDistrict", selectedDistrict);
      // productData.append("amount", totalWithDelivery);
      // productData.append("delivery", deliveryCharge);
      //   productData.append('photo',   );
      // productData.append("total", calculateTotalAmount());

      const productData = {
        names,
        phone,
        address,
        selectedDistrict,
        selectedDivision,
        totalWithDelivery,
        deliveryCharge,
        products,
      };

      console.log(productData);
    } catch (error) {
      console.log(error);
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
              {products?.length
                ? `You Have ${products.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : " Your Cart Is Empty"}
            </h4>
          </div>
        </div>
        <p>Cart Summary</p>
        <div className="row">
          <div style={{ wordSpacing: 1, lineHeight: 1 }} className="">
            {products?.map((product) => (
              <CartItem
                setProducts={setProducts}
                products={products}
                product={product}
              />
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
