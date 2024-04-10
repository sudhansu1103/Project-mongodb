import React from 'react';
import "../styles/Home.css";
import Hero from './Hero';
import Navbar from './Navbar';
import Footer from './Footer';
import Sub from './Sub';
function Home() {
  return (
    <div className='hero2'style={{ overflowY: 'auto', maxHeight: '860px' }} >
        <Navbar />
        <div >
    <Hero />
    <Sub />
    <Footer />
   
    </div>
    </div>
  );
}

export default Home;
