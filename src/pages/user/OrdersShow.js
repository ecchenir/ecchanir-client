import React from 'react'
import Layout from "../../components/Layout/Layout"
import UserMenu from "../../components/Layout/UserMenu"
import {useOrder} from "../../context/order"
import { useAuth } from "../../context/auth";
const OrdersShow = () => {
    const [order, setOrder] = useOrder();
    const [auth, setAuth] = useAuth();

    const totalPrice = () => {
        try {
          let total = 0;
          order?.map((item) => {
            total = total + item.price;
          });
          return total
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <Layout title={'Dashboard-Orders'}>
        <div className="container-fluid p-3 m-3">
            <div className="row">
                <div className="col-md-3">
                    <UserMenu/>
                </div>
                <div className="col-md-9">
                    <h1>All Orders</h1>
                    <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {order?.length
                ? `You Have ${order.length} items in your Order ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : " Your Order page Is Empty"}
            </h4>
          </div>
          <div className="col-md-8">
            {order?.map((p) => (
              <div className="row mb-2 p-3 card flex-row">
                
                <div className="col-md-8">
                  <p>Product Name: {p.name}</p>
                  <p>Product Serial Number: {p.serial}</p>
                  <p>Client Address: {p.address}</p>
                  <p>Client Currier_Address: {p.currieraddress}</p>
                  {/* <p>{p.description.substring(0, 30)}</p> */}
                  {/* <p>Price : {p.price}</p> */}
                 
                </div>
              </div>
            ))}
          </div>
        </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default OrdersShow