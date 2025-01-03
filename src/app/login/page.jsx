'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import ErrorMessage from "../components/ErrorMessage";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    router.push('/');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#1D1D1F]">
      <motion.div 
        className="w-full max-w-md p-8 bg-[#1D1D1F] rounded-lg shadow-lg border border-gray-600"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center text-white mb-6">Login</h2>

        {error && <ErrorMessage message={error} onClose={() => setError("")} />}

        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-6"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-white mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-[#1D1D1F] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#383838]"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-white mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-[#1D1D1F] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#383838]"
              placeholder="Enter your password"
            />
          </div>

          {/* Error message */}
          {error && (
            <motion.p 
              className="text-red-500 text-sm mt-2"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              {error}
            </motion.p>
          )}

          {/* Submit Button */}
          <div>
            <motion.button
              type="submit"
              className="w-full py-2 px-4 bg-[#1D1D1F] text-white font-semibold rounded-md hover:bg-[#383838] focus:outline-none focus:ring-2 focus:ring-[#383838]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Login
            </motion.button>
          </div>
        </motion.form>

        {/* Register Link */}
        <motion.div 
          className="mt-6 text-center"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="text-sm text-gray-400">
            Don’t have an account?{' '}
            <a href="/register" className="text-blue-500 hover:text-blue-400">
              Register here
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
