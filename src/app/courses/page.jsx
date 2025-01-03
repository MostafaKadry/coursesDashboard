"use client";

import { useDispatch, useSelector } from "react-redux";
import { addCourse, deleteCourse } from "../../redux/courses/courseSlice";
import ErrorMessage from "../components/ErrorMessage";
import { useState } from "react";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineFileAdd } from "react-icons/ai";

const CoursesPage = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);
  const [error, setError] = useState("");

  const [courseData, setCourseData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
  });

  // State to toggle modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
  };

  const handleAddCourse = () => {
    if (
      !courseData.name ||
      !courseData.description ||
      !courseData.price ||
      !courseData.duration
    ) {
      setError("All fields are required.");
      return;
    }

    const newCourse = {
      id: uuidv4(), // Use timestamp as a unique ID for simplicity
      name: courseData.name,
      description: courseData.description,
      price: parseFloat(courseData.price),
      duration: courseData.duration,
    };

    dispatch(addCourse(newCourse));

    // Close the modal after adding course
    setIsModalOpen(false);

    // Clear form after adding
    setCourseData({
      name: "",
      description: "",
      price: "",
      duration: "",
    });
  };

  const handleDeleteCourse = (id) => {
    dispatch(deleteCourse(id));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleCloseError = () => {
    setError("");
  };

  return (
    <div className="p-6 bg-[#1D1D1F] text-white min-h-screen w-[90%] mx-auto">
      <h1 className="text-3xl font-semibold mb-4 text-center">Courses List</h1>

      <div className="mb-4 flex flex-col lg:flex-row items-center justify-between p-6">
        <div
          className="bg-cover bg-center w-full lg:w-1/2 h-64 lg:h-auto flex items-center justify-center p-6"
          style={{ backgroundImage: "url(/images/courses_page.jpg)" }}
        >
          <div className="bg-black bg-opacity-40 text-white p-4 rounded-lg">
            <p className="text-lg font-semibold">
              Easily manage your courses: add new ones or remove outdated ones
              with just a click!
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
            <AiOutlineFileAdd className="text-xl" /> {/* Card icon */}
            <span>Add New Course</span>
          </motion.button>
        </div>
      </div>

      {/* Modal for Adding Course */}
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          initial={{ opacity: 0 }} // Initial state for opacity
          animate={{ opacity: 1 }} // Animation state for opacity
          exit={{ opacity: 0 }} // Exit animation for opacity
          transition={{ duration: 0.3 }} // Transition speed
        >
          <div className="bg-[#2C2C2E] p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Add New Course</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Course Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={courseData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-[#3A3A3C] text-white rounded-md focus:outline-none transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={courseData.description}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-[#3A3A3C] text-white rounded-md focus:outline-none transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Price</label>
                <input
                  type="number"
                  name="price"
                  value={courseData.price}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-[#3A3A3C] text-white rounded-md focus:outline-none transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  value={courseData.duration}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-[#3A3A3C] text-white rounded-md focus:outline-none transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-between space-x-4">
                <button
                  onClick={handleAddCourse}
                  className="w-full bg-[#FFDE00] text-black p-3 rounded-lg hover:bg-[#e6c200] transition-all duration-300 ease-in-out transform hover:scale-102"
                >
                  Add Course
                </button>
                <button
                  onClick={closeModal}
                  className="w-full bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-700 transition-all duration-300 ease-in-out transform hover:scale-102"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Display Courses */}
      <motion.ul
        className="space-y-4 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {courses.map((course) => (
          <motion.li
          key={course.id}
          className="w-[90%] mx-auto bg-[#2C2C2E] p-4 rounded-lg flex flex-col md:flex-row justify-between items-center hover:bg-[#3A3A3C] transition-all duration-300 ease-in-out transform hover:scale-101"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Image Section */}
          <div className="w-full md:w-1/4 mb-4 md:mb-0 md:mr-4">
            <img
              src="/images/course-card.jpeg"
              alt={course.name}
              className="w-full h-32 object-cover rounded-lg"
            />
          </div>
        
          {/* Course Info Section */}
          <div className="w-full md:flex-1 mb-4 md:mb-0">
            <h2 className="text-xl font-medium">{course.name}</h2>
            <p className="text-sm text-gray-400">{course.description}</p>
            <p className="mt-2 text-sm">Price: ${course.price}</p>
            <p className="text-sm">Duration: {course.duration}</p>
          </div>
        
          {/* Delete Button Section */}
          <motion.button
            onClick={() => handleDeleteCourse(course.id)}
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

export default CoursesPage;
