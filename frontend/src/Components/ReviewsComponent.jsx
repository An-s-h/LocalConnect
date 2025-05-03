// src/components/ReviewsComponent.jsx
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Star, Edit, Trash2, User, LogIn } from "lucide-react";
import ReviewModal from "./ReviewModal";
import { useUser } from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";

const ReviewsComponent = ({ businessName }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [averageRating, setAverageRating] = useState(0);

  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://local-connect-pi.vercel.app/api/localreviews/${encodeURIComponent(
            businessName
          )}`
        );
        setReviews(response.data);
        calculateAverageRating(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [businessName]);

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) {
      setAverageRating(0);
      return;
    }
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    setAverageRating(sum / reviews.length);
  };

  const handleAddReview = () => {
    if (!isAuthenticated) {
      // Redirect to sign-in page or show a sign-in prompt
      navigate("/sign-in", { state: { from: "review" } });
      return;
    }
    setEditingReview(null);
    setIsModalOpen(true);
  };

  const handleEditReview = (review) => {
    if (!isAuthenticated) {
      navigate("/sign-in", { state: { from: "review" } });
      return;
    }
    // Only allow editing if the current user is the review author
    if (user.username === review.userName) {
      setEditingReview(review);
      setIsModalOpen(true);
    }
  };

  const handleDeleteReview = async (id) => {
    if (!isAuthenticated) return;

    try {
      await axios.delete(
        `https://local-connect-pi.vercel.app/api/localreviews/${id}`
      );
      setReviews(reviews.filter((review) => review._id !== id));
      calculateAverageRating(reviews.filter((review) => review._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmitReview = async (reviewData) => {
    try {
      if (editingReview) {
        // Update existing review
        const response = await axios.patch(
          `https://local-connect-pi.vercel.app/api/localreviews/${editingReview._id}`,
          {
            ...reviewData,
            userName: user.username, // Ensure username comes from context
          }
        );
        setReviews(
          reviews.map((review) =>
            review._id === editingReview._id ? response.data : review
          )
        );
      } else {
        // Add new review
        const response = await axios.post(
          "https://local-connect-pi.vercel.app/api/localreviews",
          {
            ...reviewData,
            businessName,
            userName: user.username, // Add username from context
          }
        );
        setReviews([...reviews, response.data]);
      }
      calculateAverageRating(
        editingReview
          ? reviews.map((review) =>
              review._id === editingReview._id
                ? { ...review, ...reviewData }
                : review
            )
          : [
              ...reviews,
              { ...reviewData, businessName, userName: user.username },
            ]
      );
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-5 w-5 ${
            i <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
        />
      );
    }
    return <div className="flex">{stars}</div>;
  };

  if (loading)
    return <div className="text-center py-8">Loading reviews...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          <span className="localconnect-font">LocalConnect Reviews</span>
          {reviews.length > 0 && (
            <span className="ml-2 text-lg font-normal text-gray-600">
              ({reviews.length} reviews, {averageRating.toFixed(1)} avg)
            </span>
          )}
        </h2>
        {isAuthenticated ? (
          <button
            onClick={handleAddReview}
            className="px-5 py-2.5 bg-gradient-to-r bg-black text-white font-medium rounded-lg hover:from-bg-gray-500 hover:to-gray-500 transition-all flex items-center gap-2 shadow-lg"
          >
            Write Review as {user.username}
          </button>
        ) : (
          <button
            onClick={() => navigate("/sign-in", { state: { from: "review" } })}
            className="px-5 py-2.5 bg-gradient-to-r bg-black text-white font-medium rounded-lg hover:from-bg-gray-500 hover:to-gray-500 transition-all flex items-center gap-2 shadow-lg"
          >
            <LogIn className="h-5 w-5" />
            Sign In to Review
          </button>
        )}
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">
            {isAuthenticated
              ? "No reviews yet. Be the first to review!"
              : "No reviews yet. Sign in to be the first to review!"}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review._id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-200 p-2 rounded-full">
                    <User className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {review.userName}
                    </h3>
                    <div className="flex items-center mt-1">
                      {renderStars(review.rating)}
                      <span className="ml-2 text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                {isAuthenticated && user.username === review.userName && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditReview(review)}
                      className="text-gray-500 hover:text-blue-600 transition"
                      aria-label="Edit review"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review._id)}
                      className="text-gray-500 hover:text-red-600 transition"
                      aria-label="Delete review"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
              <p className="mt-4 text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      )}

      {isAuthenticated && (
        <ReviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmitReview}
          review={editingReview}
          userName={user.username}
        />
      )}
    </div>
  );
};

export default ReviewsComponent;
