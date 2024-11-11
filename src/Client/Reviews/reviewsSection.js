import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './reviewsSection.css'

const ReviewsSection = () => {
  const googleSearchLink = process.env.REACT_APP_GOOGLE_REVIEWS_LINK;
  const [googleReviews, setGoogleReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState(Number);
  const [totalRating, setTotalRating] = useState(Number);

  const fetchGoogleReviews = async () => {
    try {
      const response = await axios.get('/api/reviews');
      setGoogleReviews(response.data.result.reviews);
      setTotalReviews(response.data.result.user_ratings_total);
      setTotalRating(response.data.result.rating);
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

  const Review = ({ reviewText }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const maxChars = 100; // Adjust this to how much text you want to show initially
  
    const handleToggle = () => {
      setIsExpanded(!isExpanded);
    };
  
    return (
      <div className="review-text">
        <p>
          {isExpanded ? reviewText : `${reviewText.slice(0, maxChars)}...`}
        </p>
        <button onClick={handleToggle} className="see-more-btn">
          {isExpanded ? 'See Less' : 'See More'}
        </button>
      </div>
    );
  };

  const MoreReviews = () => {
    return(
      <div className='google-reviews-container'>
        <button>
          <a target="_blank" rel="noopener noreferrer" href={googleSearchLink}>
            View More Reviews
          </a>
        </button>
      </div>
    );
  }

  return (
    <div className="reviews-container">
      <h2 className="reviews-title">Google Reviews</h2>
      <div className="rating-summary">
          <span className="total-reviews">{totalReviews} reviews </span>
          <span className="review-rating">{totalRating ? totalRating.toFixed(1) : "N/A" }</span>
          <span className="review-rating">&#9733;</span> {/* Star icon */}
        </div>
      <div className="reviews-slider">
        <div className="reviews-container">
          <div className="reviews-slider">
            {googleReviews.map((review, index) => (
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
                  <Review reviewText={review.text} />
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