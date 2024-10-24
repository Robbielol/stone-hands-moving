import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './reviewsSection.css'

const ReviewsSection = () => {
  const googleSearchLink = process.env.REACT_APP_GOOGLE_REVIEWS_LINK;
  const [reviews, setReviews] = useState([]);

  const fetchGoogleReviews = async () => {
    try {
      const response = await axios.get('/api/reviews');
      setReviews(response.data.result.reviews);
    } catch (error) {
      console.error('Error fetching Google reviews:', error);
    }
  };

  useEffect(() => {
    fetchGoogleReviews();
  }, []);

  const StarRating = ({ rating }) => {
    const totalStars = 5;
    const filledStars = Math.floor(rating); // Get the number of filled stars (rounded down)
    const emptyStars = totalStars - filledStars; // Remaining stars will be empty
  
    return (
      <div className="review-rating">
        {Array(filledStars).fill('★').map((star, index) => (
          <span key={index} className="star filled">{star}</span>
        ))}
        {Array(emptyStars).fill('☆').map((star, index) => (
          <span key={index + filledStars} className="star empty">{star}</span>
        ))}
      </div>
    );
  };

  const MoreReviews = () => {

    return(
      <div className='google-reviews-container'>
        <button>
          <a target="_blank" rel="noopener noreferrer" href={googleSearchLink}>
            View Google Reviews Here
          </a>
        </button>
      </div>
    );
  }

  return (
    <div className="reviews-container">
      <h2 className="reviews-title">Google Reviews</h2>
      <div className="reviews-slider">
        <div className="reviews-container">
          <div className="reviews-slider">
            {reviews.map((review, index) => (
              <div key={index} className="review-card">
                <div className="review-header">
                  <div className="reviewer-identity">
                    <img 
                      src={review.profile_photo_url}
                      alt={review.author_name}
                      className="reviewer-photo"
                    />
                    <div className="reviewer-name">
                      {review.author_name}
                    </div>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
                <p className="review-text">{review.text}</p>
                <div className="review-date">
                  {new Date(review.time * 1000).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
        <MoreReviews />
      </div>
    </div>
  );
};

export default ReviewsSection;