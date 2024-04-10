import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { validateOTPAndRegister } from '../helper/helper'; // Import your OTP validation function
import Navbar from './Navbar';
import styles from '../styles/Username.module.css';
import heroImage from '../assets/bubble.png';
const RegistrationForm = () => {
  const navigate = useNavigate();
  const [otp, setOTP] = useState('');

  const formik = useFormik({
    initialValues: {
      email: 'doyol56239@cnogs.com',
      username: 'example123',
      password: 'admin@123',
    },
    onSubmit: async (values) => {
      try {
        const userDataWithOTP = { ...values, enteredOTP: otp };
        const response = await validateOTPAndRegister(userDataWithOTP);
        toast.success(response);
        setTimeout(() => {
          navigate('/validate');
        }, 2000);
      } catch (error) {
        toast.error(error.error || 'Registration failed.'); 
      }
    },
  });

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
    <div className="container mx-auto">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass} style={{ width: "45%", paddingTop: '3em'}}>
          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Register</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                Happy to join you!
            </span>
          </div>
          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <input {...formik.getFieldProps('email')} className={styles.textbox} type="text" placeholder='Email*' />
              <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Username*' />
              <input {...formik.getFieldProps('password')} className={styles.textbox} type="text" placeholder='Password*' />
              <input value={otp} onChange={(e) => setOTP(e.target.value)} className={styles.textbox} type="text" placeholder='Enter OTP*' />
              <button className={styles.btn} type='submit'>Register</button>
            </div>
            <div className="text-center py-4">
              <span className='text-gray-500'>Already Register? <Link className='text-red-500' to="/">Login Now</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div className="h-[48rem]"> </div></div>
  );
};

export default RegistrationForm;
