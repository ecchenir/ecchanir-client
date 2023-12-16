import React, { useState } from 'react'
import Layout from './../../components/Layout/Layout';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();


  //form function

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name, email, password, phone, address, answer
      })
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Somthing went worng")
    }
  }
  return (
    <Layout title="Register-Eccha-Nir">
      <div className="form-container" style={{ minHeight: "90vh" }} >

        <form onSubmit={handleSubmit}>
          <h3 className="title">Register Form</h3>
          <div className="mb-3">

            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputName"
              placeholder="Enter Your Name" required />

          </div>
          <div className="mb-3">

            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail" placeholder="Enter Your Email" required />

          </div>
          <div className="mb-3">

            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword" placeholder="Enter Your Password" required />
          </div>

          <div className="mb-3">

            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="exampleInputPhone" placeholder="Enter Your Phone Number" required />

          </div>
          <div className="mb-3">

            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" id="exampleInputAddress" placeholder="Enter Your Address" required />

          </div>
          <div className="mb-3">

            <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className="form-control" id="exampleInputAddress" placeholder="Enter Your best friend name" required />

          </div>
          <button type="submit" className="btn btn-primary">Register</button>
          <p className='mt-2'>Already have an account <a href="/login">Login Hare</a></p>
        </form>

      </div>
    </Layout>
  )
}

export default Register