'use client';

import { motion, AnimatePresence } from 'framer-motion';

const ErrorMessage = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="error-popup"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50"
      >
        <div className="bg-red-500 text-white p-4 rounded-md shadow-lg text-center max-w-md w-full mx-4">
          <p className="text-lg font-semibold">⚠️ {message}</p>
          <button
            onClick={onClose}
            className="mt-4 bg-white text-red-500 px-4 py-2 rounded-md hover:bg-gray-200 transition-all duration-300"
          >
            Close
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ErrorMessage;