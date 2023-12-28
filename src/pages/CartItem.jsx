import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useCart } from "../context/cart";

export default function CartItem({
  products,
  setProducts,
  product,
  totalPrice,
}) {
  const [qty, setQty] = useState(1);
  const [cart, setCart] = useCart();

  const { _id } = product;

  useEffect(() => {
    totalPrice();
  }, [qty]);

  useEffect(() => {
    // console.log(products);
    // console.log(product);

    if (product?.quantity > 0) setQty(product.quantity);
  }, []);

  const handleInc = () => {
    setQty(qty + 1);
    let updatedProducts = products.map((item) =>
      item._id === _id ? { ...item, quantity: item.quantity + 1 } : item
    );

    setProducts(updatedProducts);

    console.log(updatedProducts);
  };

  const handleDec = () => {
    if (qty < 2) return;
    setQty(qty - 1);

    let updatedProducts = products.map((item) =>
      item._id === _id ? { ...item, quantity: item.quantity - 1 } : item
    );

    setProducts(updatedProducts);
  };

  const removeCartItem = (pid) => {
    try {
      // Create a new array excluding the item with the specified _id
      const updatedProducts = products.filter((item) => item._id !== _id);

      // Update state with the new array
      setProducts(updatedProducts);

      // Update localStorage with the new array
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);

      setCart(myCart);

      // Update localStorage with the modified cart array
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const total = product.price * qty;

  useEffect(() => {
    // Listen for changes in local storage
    const handleStorageChange = (e) => {
      if (e.key === "cart") {
        // If the "cart" key changes, update the state with the new data
        const updatedProducts = JSON.parse(localStorage.getItem("cart")) || [];
        setProducts(updatedProducts);
      }
    };

    // Add the event listener
    window.addEventListener("storage", handleStorageChange);

    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [setProducts]);

  return (
    <div
      key={product._id}
      className="d-flex mb-3 lg:p-5 p-2 align-items-center justify-content-between bg-light "
    >
      {/* product image */}
      <div>
        <img
          src={`https://new-ecchanir-server.vercel.app/api/v1/product/product-photo/${product._id}`}
          className="cart-image"
          alt={product.name}
          width="100px"
          height={"100px"}
        />
      </div>

      {/* product details */}
      <div className="w-50">
        <p>{product.name}</p>
        <p>{product.selectedSize}</p>
        <p className="price mb-2">{total}Taka</p>

        {/* quantity control */}

        <div className="border  d-flex justify-content-between px-2 align-items-center ">
          <p className="btn" onClick={handleDec}>
            -
          </p>
          <p
            style={{
              fontSize: "18px",
              fontWeight: "bold",
            }}
            className=""
          >
            {qty}
          </p>
          <p className="btn" onClick={handleInc}>
            +
          </p>
        </div>
      </div>

      {/* action */}
      <div>
        <button
          className="btn ms-1"
          onClick={() => removeCartItem(product._id)}
        >
          <MdDelete style={{ fontSize: "18px" }} />
        </button>
      </div>
    </div>
  );
}
