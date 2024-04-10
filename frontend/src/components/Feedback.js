import React, { useState, useEffect, useRef } from 'react';
import '../styles/Rating.css';
import Navbar from './Navbar';

function Feedback() {
  const [feedbackData, setFeedbackData] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [expandedComments, setExpandedComments] = useState({});
  const [commentsReady, setCommentsReady] = useState(false);

  useEffect(() => {
   
    fetch('http://localhost:8080/api/feedback/all')
      .then(response => response.json())
      .then(data => {
        setFeedbackData(data);
        const totalRating = data.reduce((acc, feedback) => acc + feedback.rating, 0);
        const avgRating = totalRating / data.length;
        setAverageRating(avgRating);
      })
      .catch(error => console.error('Error fetching feedback:', error));
  }, []);

  const commentRefs = useRef([]);

  useEffect(() => {
    if (feedbackData.length > 0) {
      setCommentsReady(true);
    }
  }, [feedbackData]);

  const toggleCommentExpansion = id => {
    setExpandedComments(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };


  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const shouldShowReadMore = (comment, id) => {
    const maxHeight = 50; 
    return (
      commentRefs.current[id] &&
      commentRefs.current[id].clientHeight > maxHeight
    );
  };

  const renderComment = (comment, id) => {
    return (
      <div ref={ref => (commentRefs.current[id] = ref)}>
        {comment.length > 100 && !expandedComments[id] ? `${comment.slice(0, 100)}...` : comment}
        {commentsReady && shouldShowReadMore(comment, id) && !expandedComments[id] && (
          <span onClick={() => toggleCommentExpansion(id)} style={{ cursor: 'pointer', color: 'blue' }}>
            ...Read more
          </span>
        )}
      </div>
    );
  };
  
  const renderStars = (rating) => {
    const roundedRating = Math.round(rating);
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < roundedRating) {
        stars.push(<span key={i} className="star">&#9733;</span>);
      } else {
        stars.push(<span key={i} className="star">&#9734;</span>);
      }
    }
    return stars;
  };

  return (
    <div className="feedback-wrapper">
      <Navbar />
      <div className="feedback-container">
        
        <div className="average-rating text-white">
        <h1 className='text-[#ffc107] font-medium text-[30px]'>Feedback</h1>{renderStars(averageRating)}
        <h2 className='text-[#ffc107] font-medium text-[30px]'>Average Rating: {averageRating.toFixed(1)}</h2>
        </div>
   
        <div className="feedback-list">
          {feedbackData.map(feedback => (
            <div key={feedback._id} className="feedback-item">
              <p>Username: {feedback.username}</p>
              <p>Rating: {renderStars(feedback.rating)}</p>
              <p>Comment: {renderComment(feedback.comment, feedback._id)}</p>
              <p>Submitted: {formatDate(feedback.createdAt)}</p>
            </div>
          ))}
        </div>
      </div> <div className='h-[120px]'></div>
    </div>
  );
}

export default Feedback;
