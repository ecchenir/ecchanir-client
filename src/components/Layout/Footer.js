import React from "react";
import {
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaTiktok,
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import SearchInput from "../Form/SearchInput";

const Footer = () => {
  return (
    <div className="bg-light text-center text-dark ">
      <div className=" text-center text-lg-start">
        {/* Grid container */}
        <div className="container p-1">
          {/*Grid row*/}
          <div className="row mt-3">
            {/*Grid column*/}
            <div className="col-lg-3 col-md-12 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-4">EcchaNir</h5>
              <p>
                <img
                  className="bang-Image"
                  width={100}
                  height={100}
                  src="/ecchenir.jpg"
                  alt=""
                />
              </p>

              <div className="mt-1 text-dark">
                {/* Facebook */}

                <a
                  type="button"
                  className="btn btn-outline-light btn-floating  m-1"
                  href="https://www.facebook.com/ecchenir.com.bd/?ref=page_internal"
                >
                  <FaFacebook />
                </a>
                {/* Twitter */}
                <a
                  type="button"
                  className="btn btn-outline-light btn-floating  m-1"
                  href="https://www.instagram.com/ecchenir/?fbclid=IwAR0dOUlGP_uyf4SBGlCML9Y4BYMyNcxL8F_qI6njM5uJ8fpFF2E-7GCGiBs"
                >
                  <FaInstagram />
                </a>
                {/* Google + */}

                <a
                  type="button"
                  className="btn btn-outline-light btn-floating  m-1"
                  href="https://www.ecchenir@gmail.com"
                >
                  <HiOutlineMail />
                </a>
                {/* Linkedin */}
              </div>
            </div>
            {/*Grid column*/}
            {/*Grid column*/}

            {/*Grid column*/}
            {/*Grid column*/}
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-4">About Us</h5>

              <p>
                {" "}
                <a href="/"> Contact Us</a>{" "}
              </p>
              <p>
                {" "}
                <a href="/"> About Us</a>{" "}
              </p>
              <p>
                {" "}
                <a href="/">Product</a>{" "}
              </p>
              <p>
                {" "}
                <a href="/"> Office</a>{" "}
              </p>
              <p>
                <div className="d-flex   gap-2 ">
                  Flows Us
                  <p>
                    <a
                      target="_blank"
                      href="https://www.facebook.com/ecchenir.com.bd/?ref=page_internal"
                    >
                      {" "}
                      <FaFacebook />
                    </a>
                  </p>
                  <p>
                    <a
                      target="_blank"
                      href="https://www.instagram.com/ecchenir/?fbclid=IwAR0dOUlGP_uyf4SBGlCML9Y4BYMyNcxL8F_qI6njM5uJ8fpFF2E-7GCGiBs"
                    >
                      {" "}
                      <FaInstagram />
                    </a>
                  </p>
                  <p>
                    <a
                      target="_blank"
                      href="https://www.tiktok.com/@ecchenir?is_from_webapp=1&sender_device=pc"
                    >
                      {" "}
                      <FaTiktok />
                    </a>
                  </p>
                  <p>
                    <a
                      target="_blank"
                      href="https://www.linkedin.com/in/ecchenir?fbclid=IwAR01YaE-EsF-xuBvh-v2WUX8pawf4tlQk5B3Qy_TXp6FVv9KAmeSCEPfgh8"
                    >
                      {" "}
                      <FaLinkedin />
                    </a>
                  </p>
                  <p>
                    <a
                      target="_blank"
                      href="https://www.linkedin.com/in/ecchenir?fbclid=IwAR01YaE-EsF-xuBvh-v2WUX8pawf4tlQk5B3Qy_TXp6FVv9KAmeSCEPfgh8"
                    >
                      {" "}
                      <FaWhatsapp />
                    </a>
                  </p>
                </div>
              </p>
            </div>

            {/* <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <p>Introducing Ecchenir Founder MD EMON HOSSAIN , a dynamic and contemporary t-shirt brand that's redefining casual fashion. Born from a passion for style and comfort, our brand is all about embracing individuality and self-expression through high-quality, thoughtfully designed t-shirts.</p>

            </div> */}
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-4 pb-1">Subscribe Now</h5>
              <SearchInput />

              <div>
                <a
                  target="_blank"
                  href="https://www.facebook.com/groups/ecchenir"
                >
                  {" "}
                  Join Our FaceBook Group{" "}
                </a>
              </div>
            </div>

            {/*Grid column*/}
          </div>
          {/*Grid row*/}
        </div>
        {/* Grid container */}
        {/* Copyright */}
        <div
          className="text-center p-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          <p>© 2024 EccheNir. All rights reserved.</p>
        </div>
        {/* Copyright */}
      </div>
    </div>
  );
};

export default Footer;
