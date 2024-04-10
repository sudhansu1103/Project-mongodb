import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUsername } from '../helper/helper'; 
import { FaStar } from 'react-icons/fa';
import Navbar from './Navbar';
import heroImage from '../assets/bubble.png';
function Rating() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    async function fetchUsername() {
      try {
        const { username } = await getUsername();
        setUsername(username);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    }
    fetchUsername();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/feedback', { username, rating, comment });
      alert('Feedback submitted successfully!');

      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again later.');
    }
  };

  const handleStarClick = (value) => {
    setRating(value);
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
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
  <div style={{ backgroundColor: '#f8f9fa', borderRadius: '10px', padding: '50px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }} className='mb-20'>
    <h2 style={{ textAlign: 'center' }}>Feedback Form</h2>
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {[...Array(5)].map((_, index) => {
          const value = index + 1;
          return (
            <FaStar
              key={index}
              size={30}
              style={{ margin: '0.5rem', cursor: 'pointer' }}
              color={value <= rating ? '#ffc107' : '#e4e5e9'}
              onClick={() => handleStarClick(value)}
            />
          );
        })}
      </div>
      <div style={{ marginTop: '20px' }}>
        <label htmlFor="comment" style={{ display: 'block' }}>Comment:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        ></textarea>
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Submit Feedback</button>
      </div>
    </form>
  </div>
</div>
</div>
  );
}

export default Rating;
