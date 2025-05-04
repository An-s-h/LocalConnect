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
          `https://local-connect-one.vercel.app/api/localreviews/${encodeURIComponent(
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
    if (user.username === review.userName) {
      setEditingReview(review);
      setIsModalOpen(true);
    }
  };

  const handleDeleteReview = async (id) => {
    if (!isAuthenticated) return;

    try {
      await axios.delete(
        `https://local-connect-one.vercel.app/api/localreviews/${id}`
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
        const response = await axios.patch(
          `https://local-connect-one.vercel.app/api/localreviews/${editingReview._id}`,
          {
            ...reviewData,
            userName: user.username,
          }
        );
        setReviews(
          reviews.map((review) =>
            review._id === editingReview._id ? response.data : review
          )
        );
      } else {
        const response = await axios.post(
          "https://local-connect-one.vercel.app/api/localreviews",
          {
            ...reviewData,
            businessName,
            userName: user.username,
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
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`h-4 w-4 sm:h-5 sm:w-5 ${
              i <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  if (loading)
    return <div className="text-center py-8">Loading reviews...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          <span className="localconnect-font">LocalConnect Reviews</span>
          {reviews.length > 0 && (
            <span className="ml-2 text-sm sm:text-lg font-normal text-gray-600">
              ({reviews.length} reviews, {averageRating.toFixed(1)} avg)
            </span>
          )}
        </h2>
        {isAuthenticated ? (
          <button
            onClick={handleAddReview}
            className="w-full sm:w-auto px-4 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-700 transition-all flex items-center justify-center gap-2 shadow-md text-sm sm:text-base"
          >
            <Edit className="h-4 w-4" />
            <span>Review as {user.username.split(" ")[0]}</span>
          </button>
        ) : (
          <button
            onClick={() => navigate("/sign-in", { state: { from: "review" } })}
            className="w-full sm:w-auto px-4 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-700 transition-all flex items-center justify-center gap-2 shadow-md text-sm sm:text-base"
          >
            <LogIn className="h-4 w-4" />
            <span>Sign In to Review</span>
          </button>
        )}
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">
            {isAuthenticated
              ? "No reviews yet. Be the first to review!"
              : "No reviews yet. Sign in to be the first to review!"}
          </p>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white p-4 sm:p-6 rounded-lg shadow-sm sm:shadow-md"
            >
              <div className="flex justify-between items-start gap-3">
                <div className="flex items-start sm:items-center space-x-3">
                  <div className="bg-gray-200 p-1.5 sm:p-2 rounded-full">
                    <User className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base">
                      {review.userName}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center mt-1 gap-1 sm:gap-2">
                      {renderStars(review.rating)}
                      <span className="text-xs sm:text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                {isAuthenticated && user.username === review.userName && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditReview(review)}
                      className="text-gray-500 hover:text-blue-600 transition p-1"
                      aria-label="Edit review"
                    >
                      <Edit className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review._id)}
                      className="text-gray-500 hover:text-red-600 transition p-1"
                      aria-label="Delete review"
                    >
                      <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </div>
                )}
              </div>
              <p className="mt-3 text-gray-700 text-sm sm:text-base">
                {review.comment}
              </p>
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
