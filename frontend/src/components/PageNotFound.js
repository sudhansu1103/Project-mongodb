import React from 'react'
import Navbar from './Navbar'
import heroImage from '../assets/bubble.png';
export default function PageNotFound() {
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
    <div className='text-[#ffffff]'>
    PageNotFound</div>
    <div className='h-[40rem]'></div></div>
  )
}
