import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaPhoneAlt, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from 'react-icons/hi';
import { MdEmail } from "react-icons/md";

export default function SubHeader() {
  return (
    <div className='subHeader d-flex justify-content-between '>
      <div className='d-flex gap-3  '>

        <div className='d-flex gap-2 justify-content-center text'>
          <FaPhoneAlt className='iconSize' />
          <p>01603257876</p>
        </div>
        <div className='d-flex gap-2 justify-content-center text'>
          <HiOutlineMail className='iconSize' />
          <p>ecchenir@gmail.com</p>
        </div>


      </div>
      <div className='d-lg-flex d-md-flex  d-none d-sm-block  gap-2 '>
        Flows Us

        <p><a target='_blank' href="https://www.facebook.com/ecchenir.com.bd/?ref=page_internal"> <FaFacebook /></a></p>
        <p><a target='_blank' href="https://www.instagram.com/ecchenir/?fbclid=IwAR0dOUlGP_uyf4SBGlCML9Y4BYMyNcxL8F_qI6njM5uJ8fpFF2E-7GCGiBs"> < FaInstagram /></a></p>
        <p><a target='_blank' href="https://www.tiktok.com/@ecchenir?is_from_webapp=1&sender_device=pc"> < FaTiktok /></a></p>
        <p><a target='_blank' href="https://www.linkedin.com/in/ecchenir?fbclid=IwAR01YaE-EsF-xuBvh-v2WUX8pawf4tlQk5B3Qy_TXp6FVv9KAmeSCEPfgh8"> < FaLinkedin /></a></p>
       

        <p><a target='_blank'  href="https://api.whatsapp.com/send?phone=01603257876"> < FaWhatsapp /></a></p>

      </div>
    </div>
  )
}
