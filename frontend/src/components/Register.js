import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { registerValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';
import { registerUser, validateOTPAndRegister } from '../helper/helper';

import styles from '../styles/Username.module.css';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Navbar from './Navbar';
import heroImage from '../assets/bubble.png';
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;
export default function Register() {
  const navigate = useNavigate();
  const [file, setFile] = useState('');
  const [showOTPField, setShowOTPField] = useState(false);
  
  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      enteredOTP: '',
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      
      try {
        await registerUser(values);
        setShowOTPField(true);
        toast.success('Registration successful! Please check your email for OTP.');
      } catch (error) {
        console.error('Error registering:', error);
        toast.error('Registration failed. Please try again.');
      }
    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };


  const handleOTPSubmit = async () => {
    try {
      const { enteredOTP, email, username, password } = formik.values; 
  
      const response = await axios.post('/api/validate-otp-and-register', {
        enteredOTP,
        email,
        username,
        password,
      });
  
      if (response.status === 201) {
        toast.success('OTP verification successful!');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        toast.error('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('Error verifying OTP. Please try again.');
    }
  };
  return (
    <div className='skm'>
      <div className="hero" >
          <img src={heroImage} alt="bubble" />
          <img src={heroImage} alt="bubble" />
          <img src={heroImage} alt="bubble" />
          <img src={heroImage} alt="bubble" />
          <img src={heroImage} alt="bubble" />
          <img src={heroImage} alt="bubble" />
          <img src={heroImage} alt="bubble" />
          <img src={heroImage} alt="bubble" />
          <img src={heroImage} alt="bubble" />
        </div>
      <Navbar />
      <div className="container mx-auto ">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="flex justify-center items-center h-screen ">
          <div className={styles.glass} style={{ width: '45%', paddingTop: '0em' }}>

            {!showOTPField ? (
              <form className="" onSubmit={formik.handleSubmit}>
                 <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img src={file || avatar} className={styles.profile_img} alt="avatar" />
              </label>
              <input onChange={onUpload} type="file" id="profile" name="profile" />
            </div>
                 <div className="textbox flex flex-col items-center gap-6">
                <input
                  {...formik.getFieldProps('email')}
                  className={styles.textbox}
                  type="text"
                  placeholder="Email*"
                />
                <input
                  {...formik.getFieldProps('username')}
                  className={styles.textbox}
                  type="text"
                  placeholder="Username*"
                />
                <input
                  {...formik.getFieldProps('password')}
                  className={styles.textbox}
                  type="text"
                  placeholder="Password*"
                />
                <button className={styles.btn} type="submit">
                  Register
                </button>
              </div>

              </form>
            ) : (
             
              <div className="textbox flex flex-col items-center gap-6">
                <input
                  {...formik.getFieldProps('enteredOTP')}
                  className={styles.textbox1} 
                  type="text"
                  placeholder="Enter OTP*"
              
                />
                <button className={styles.btn} type="button" onClick={handleOTPSubmit}>
                  Submit OTP
                </button>
              </div>
            )}

            <div className="text-center py-4">
              <span className="text-gray-500">
                Already registered?{' '}
                <Link className="text-red-500" to="/login">
                  Login Now
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}