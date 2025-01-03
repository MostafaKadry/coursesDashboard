'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

const Card = ({ title, description, icon, route }) => {
  const router = useRouter();

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="p-6 bg-[#2C2C2E] rounded-lg shadow-lg cursor-pointer hover:bg-[#3C3C3E] transition-colors"
      onClick={() => router.push(route)}
    >
      <div className="text-4xl mb-4 text-center">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </motion.div>
  );
};

export default Card;
