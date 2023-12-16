import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../../context/order";
import Table from 'react-bootstrap/Table';
import { Button ,Badge} from 'react-bootstrap';

const Orders = () => {
    const [products, setProducts] = useState([]);
    const [order, setOrder] = useOrder();
    const [id, setId] = useState("");
    const navigate = useNavigate();
  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/order/get-order");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this order ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `/api/v1/order/delete-order/${id}`
      );
      toast.success("Order Deleted Successfully");
      
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };


  const handleConfirm = async (_id) => {
    console.log(_id);
    
    try {
      const data = { status: 'complete' };
      console.log('Button clicked');
      const updateOrder = await axios.put(`/api/v1/order/update-order/${_id}`, data);
      navigate(`/dashboard/admin/compleatOrder/${_id}`)
      console.log("Axios Response", updateOrder);
    } catch (error) {
      console.error('Error updating data', error);
    }
  };
  



const reversedProduct = [...products].reverse();
// console.log(products);
  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
      <div className="row">
            <div className="col-md-3">
                <AdminMenu/>
            </div>


<div className="col-md-9">
<Table responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Customer Name</th>
            <th>Phone</th>
            <th>District</th>
            <th>Product Number</th>
            <th>Qty</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
       
      <tbody>
        {reversedProduct?.map((product, index) => (
          <tr key={index} onClick={() => navigate(`/dashboard/admin/compleatOrder/${product._id}`)}>
            <td>{index + 1}</td>
            <td>{product.names}</td>
            <td>{product.phone}</td>
            <td>{product.selectedDistrict}</td>
            <td>{product.productNumber}</td>
            <td>{product.quantities}</td>
            <td align='center'>


              <Badge   bg={product.status === "pending" ? 'secondary':"success"}
              > {product.status}</Badge>
             
            </td>
            <td align='center'>
              <Button
                variant='success'
                onClick={() => handleConfirm(product._id)}
                disabled={product.status === 'complete'}
              >
                Confirm
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
      </Table>
</div>



            <div className="col-md-9">
            <h1 className="text-center">All Order List</h1>
            <div className="d-flex flex-wrap">
            {products?.map((p) => (
             <Link
             key={p._id}
             to={`/dashboard/admin/order/${p.slug}`}
             className="product-link"
           >
                <div className="card m-2" style={{ width: "18rem" }}>
                  {/* <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    height={"150px"}
                    alt={p.name}
                  /> */}
                  <div className="card-body">
                    <h5 className="card-title">Name: {p.names}</h5>           
                     
                    <p className="card-text">phone: {p.phone}</p>
                    <p className="card-text">Contact Number: {p.phone}</p>
                    <p className="card-text">Product Number: {p.productNumber}</p>
                    <p className="card-text"> District: {p.selectedDistrict}</p>
                    <p className="card-text">address: {p.address}</p>              
                   
                    <p className="card-text">size: {p.size}</p>
                    <p className="card-text">Quantity: {p.quantities}</p>
                    <p className="card-text">Price: {p.amount}Taka</p>
                    <p className="card-text">Price: {p.delivery}Taka</p>
                    <p className="card-text">Price: {p.total}Taka</p>
                  </div>
                  <div>
                  <button className="btn btn-secondary ms-1"
                    onClick={() => {
                      setOrder([...order, p]);
                      localStorage.setItem(
                        "order",
                        JSON.stringify([...order, p])
                      );
                      toast.success("Item Added to order");
                    }} >Confirm</button>
                     <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE 
                </button>
                  </div>
                </div>
                </Link>
            ))}
          </div>
            </div>
        </div>
      </div>
        
    </Layout>
  )
}

export default Orders