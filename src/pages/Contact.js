import React from "react";
import Layout from "../components/Layout/Layout";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { BiMailSend, BiPhoneCall } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout>
      <div className="col-md-6 container text-center mt-5">
        <h6 className="text-justify mt-2">
          "EccheNir" is a reliable and trusted Clothing brand. We manufacture
          and deliver products ourselves, and customer satisfaction is always
          our pursuit. Thanks for staying with "EccheNir"
        </h6>
        <p className="bg-success p-2 text-white text-center rounded-1 text-uppercase">
          CONTACT Information
        </p>

        <p className="mt-3">
          <BiMailSend /> :ecchenir@gmail.com
        </p>
        <p className="mt-3">
          <BiPhoneCall /> : 01787229014
        </p>
        <p className="mt-3">
          <MdLocationPin /> : House-08, Rd-04, Senpara parbata, Mirpur-10, Dhaka
        </p>
        <div className="d-lg-flex d-none d-sm-block  gap-2 ">
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
            <a target="_blank" href="">
              {" "}
              <FaWhatsapp />
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
