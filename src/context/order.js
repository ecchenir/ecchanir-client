import { useState, useContext, createContext, useEffect } from "react";

const OrderContext = createContext();
const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    let existingOrderItem = localStorage.getItem("order");
    if (existingOrderItem) setOrder(JSON.parse(existingOrderItem));
  }, []);

  return (
    <OrderContext.Provider value={[order, setOrder]}>
      {children}
    </OrderContext.Provider>
  );
};

// custom hook
const useOrder = () => useContext( OrderContext);

export { useOrder, OrderProvider };