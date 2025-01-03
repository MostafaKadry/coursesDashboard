"use client";

import { useDispatch, useSelector } from "react-redux";
import { addTrainer, deleteTrainer } from "../../redux/trainers/trainersSlice.js";
import ErrorMessage from '../components/ErrorMessage';
import { useState } from "react";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineUserAdd } from 'react-icons/ai'; 
import { FaUserTie } from 'react-icons/fa';
const TrainersPage = () => {
  const dispatch = useDispatch();
  const trainers = useSelector((state) => state.trainers.trainers);
  const [error, setError] = useState('');
  const [trainerData, setTrainerData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  // State to toggle modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTrainerData({
      ...trainerData,
      [name]: value,
    });
  };

  const handleAddTrainer = () => {
    if (!trainerData.fullName || !trainerData.email || !trainerData.phone) {
      setError('All fields are required.');
      return;
    }

    const newTrainer = {
      id: uuidv4(),
      fullName: trainerData.fullName,
      email: trainerData.email,
      phone: trainerData.phone,
    };

    dispatch(addTrainer(newTrainer));

    // Close the modal after adding trainer
    setIsModalOpen(false);

    // Clear form after adding
    setTrainerData({
      fullName: "",
      email: "",
      phone: "",
    });
  };

  const handleDeleteTrainer = (id) => {
    dispatch(deleteTrainer(id));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleCloseError = () => {
    setError('');
  };

  return (
    <div className="p-6 bg-[#1D1D1F] text-white min-h-screen w-[90%] mx-auto my-5">
      <h1 className="text-3xl font-semibold mb-4 text-center">Trainers</h1>
      <div className="mb-4 flex flex-col lg:flex-row items-center justify-between p-6">
        <div
          className="bg-cover bg-center w-full lg:w-1/2 h-64 lg:h-auto flex items-center justify-center p-6"
          style={{ backgroundImage: "url(/images/courses_page.jpg)" }}
        >
          <div className="bg-black bg-opacity-40 text-white p-4 rounded-lg">
            <p className="text-lg font-semibold">
            Easily manage your trainers: add new ones or remove outdated ones with just a click!
            </p>
          </div>
        </div>

        <div className="w-full lg:w-auto mt-4 lg:mt-0">
          <motion.button
            onClick={openModal}
            className="bg-[#FFDE00] text-black p-3 rounded-lg hover:bg-[#e6c200] transition-all duration-300 ease-in-out transform hover:scale-102 flex items-center justify-center space-x-2 w-full lg:w-auto"
            whileHover={{ scale: 1.01 }} // Hover scale effect
            whileTap={{ scale: 0.95 }} // Tap effect
          >
            <AiOutlineUserAdd className="text-xl" />
            <span> Add New Trainer</span>
          </motion.button>
        </div>
      </div>



      {/* Modal for Adding Trainer */}
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-[#2C2C2E] p-6 rounded-lg max-w-md w-full"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <h2 className="text-xl font-semibold mb-4">Add New Trainer</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={trainerData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-[#3A3A3C] text-white rounded-md focus:outline-none transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={trainerData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-[#3A3A3C] text-white rounded-md focus:outline-none transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={trainerData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-[#3A3A3C] text-white rounded-md focus:outline-none transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-between space-x-4">
                <motion.button
                  onClick={handleAddTrainer}
                  className="w-full bg-[#FFDE00] text-black p-3 rounded-lg hover:bg-[#e6c200] transition-all duration-300 ease-in-out transform hover:scale-102"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Add Trainer
                </motion.button>
                <motion.button
                  onClick={closeModal}
                  className="w-full bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-700 transition-all duration-300 ease-in-out transform hover:scale-102"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Display Trainers */}
      <motion.ul
  className="space-y-4 w-[90%] mx-auto my-6"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
>
  {trainers.map((trainer) => (
    <motion.li
    key={trainer.id}
    className="bg-[#2C2C2E] p-4 rounded-lg flex flex-col md:flex-row justify-between items-center hover:bg-[#3A3A3C] transition-all duration-300 ease-in-out transform hover:scale-102"
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.95 }}
  >
    {/* Trainer Details Section */}
    <div className="flex items-center space-x-4 w-full md:w-auto mb-4 md:mb-0">
      {/* Icon Section */}
      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
        <FaUserTie className="text-xl text-gray-700" /> {/* Icon here */}
      </div>
  
      {/* Trainer Details */}
      <div>
        <h2 className="text-xl font-medium">{trainer.fullName}</h2>
        <p className="text-sm text-gray-400">{trainer.email}</p>
        <p className="mt-2 text-sm">Phone: {trainer.phone}</p>
      </div>
    </div>
  
    {/* Delete Button Section */}
    <motion.button
      onClick={() => handleDeleteTrainer(trainer.id)}
      className="w-full md:w-auto bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition-all duration-300 ease-in-out transform hover:scale-102"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      Delete
    </motion.button>
  </motion.li>
  
  ))}
</motion.ul>

      <ErrorMessage message={error} onClose={handleCloseError} />
    </div>
  );
};

export default TrainersPage;
