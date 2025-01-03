'use client';

import React from 'react';
import Card from './Card';
import { motion } from 'framer-motion';
import { FaChalkboard } from 'react-icons/fa';
import { FaUserTie } from 'react-icons/fa';
import { FaClipboardList } from 'react-icons/fa';
import { MdPayment } from 'react-icons/md';



const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
};

const Dashboard = () => {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Courses Management */}
      <Card
        title="Courses Management"
        description="Manage courses easily."
        icon={<FaChalkboard className="text-5xl text-purple-600 inline-block" />}
        route="/courses"
      />
      
      {/* Trainers Management */}
      <Card
        title="Trainers Management"
        description="Manage trainers easily."
        icon={<FaUserTie className="text-5xl text-purple-600 inline-block" />}
        route="/trainers"
      />
      
      {/* Link Course to Trainer */}
      <Card
        title="Link Course to Trainer"
        description="Registering trainees in courses."
        icon={<FaClipboardList className="text-5xl text-purple-600 inline-block" />}
        route="/manage_trainers_in_course"
      />
      
      {/* Payment Management */}
      <Card
        title="Payment Management"
        description="Handle payments and financial records."
        icon={<MdPayment className="text-5xl text-purple-600 inline-block" />}
        route="/payments"
      />
    </motion.div>
  );
};

export default Dashboard;
console.log('Hello Mostafa3');
