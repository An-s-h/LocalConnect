import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import { useUser } from '../Contexts/UserContext';
import { AnimatePresence, motion } from 'framer-motion';

const ReviewModal = ({ isOpen, onClose, onSubmit, review }) => {
  const { user } = useUser();
  const [rating, setRating] = useState(review?.rating || 0);
  const [comment, setComment] = useState(review?.comment || '');
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ 
      rating, 
      comment,
      userName: user?.username || 'Anonymous'
    });
    setRating(0);
    setComment('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/80  p-4 grid place-items-center"
        >
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ 
              duration: 0.4, 
              ease: [0.22, 1, 0.36, 1],
              scale: { duration: 0.3 }
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-gray-900 rounded-xl border border-gray-800 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-800">
              <div className="flex justify-between items-center">
                <motion.h3
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-xl font-semibold text-white"
                >
                  {review ? 'Edit Review' : `Review as ${user?.username || 'You'}`}
                </motion.h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Rating */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-2"
                >
                  <label className="block text-sm font-medium text-gray-400">
                    Your Rating
                  </label>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`h-8 w-8 transition-all duration-200 ${
                            (hoverRating || rating) >= star
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-600'
                          }`}
                        />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Comment */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="space-y-2"
                >
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-400">
                    Your Review
                  </label>
                  <textarea
                    id="comment"
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-200 placeholder-gray-500 transition-all duration-200"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    placeholder="Share your experience..."
                  />
                </motion.div>

                {/* Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex gap-3 pt-2"
                >
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700/80 text-gray-300 font-medium rounded-lg transition-all"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: rating === 0 ? 1 : 1.02 }}
                    whileTap={{ scale: rating === 0 ? 1 : 0.98 }}
                    disabled={rating === 0}
                    className={`flex-1 px-4 py-3 font-medium rounded-lg transition-all ${
                      rating === 0
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  >
                    {review ? 'Update' : 'Submit'}
                  </motion.button>
                </motion.div>
              </form>
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReviewModal;