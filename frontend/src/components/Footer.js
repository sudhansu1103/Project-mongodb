import React from 'react';
import "../styles/Footer.css";
import Logo from "../assets/vssitnew.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

function Footer() {
  const Navigate = useNavigate();

  return (
    <div className='footer-container bg-[#260669] text-white py-12 px-6 sm:px-12 lg:px-24 xl:px-32'>
      <div className='flex flex-col sm:flex-row justify-between items-start'>
        <div className='mb-6 sm:mb-0'>
          <img src={Logo} alt="VSIT Logo" className='w-30 cursor-pointer' onClick={() => Navigate("/login")} />
          <p className='text-sm mt-4'>Vidyalankar School of Information Technology is amongst the most popular colleges of the city offering undergraduate, postgraduate and doctoral programmes in IT, Commerce, Management and Mass Media. Vidyalankar School of Information Technology is a college affiliated to the University of Mumbai and approved by the Government of Maharashtra.</p>
        </div>

        <div className='mb-6 sm:mb-0'>
          <h1 className='font-bold text-xl mb-4 text-white' >Contact Us</h1>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/Vidyalankar.VSIT/"><FontAwesomeIcon icon={faFacebook} style={{ color: "#f7c223",fontSize:'25px' }} /></a>
            <a href="https://www.instagram.com/vsitinsta/"><FontAwesomeIcon icon={faInstagram} style={{ color: "#f7c223",fontSize:'25px' }} /></a>
            <a href="https://twitter.com/VidyalankarT"><FontAwesomeIcon icon={faTwitter} style={{ color: "#f7c223" ,fontSize:'25px'}} /></a>
            <a href="tel:+912224104244"><FontAwesomeIcon icon={faPhoneAlt} style={{ color: "#f7c223",fontSize:'25px' }} /></a>
          </div>
        </div>
      </div>

      <div className='mt-6'>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6808.028913433853!2d72.86510934214333!3d19.019389024564827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf394b345bdd%3A0x8d44ea4f85af3ceb!2sVidyalankar%20School%20of%20Information%20Technology!5e0!3m2!1sen!2sin!4v1708669321546!5m2!1sen!2sin" width="100%" height="300" style={{ border: 0 }} allowFullScreen="" loading="lazy" title="Map"></iframe>
      </div>
      <div className='h-[10rem] max767:h-[2rem]'></div>
    </div>
  );
}

export default Footer;
