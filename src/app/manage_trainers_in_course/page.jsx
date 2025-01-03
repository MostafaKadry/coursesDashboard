"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  assignTrainerToCourse,
  removeTrainerFromCourse,
} from "../../redux/trainersInCourses/trainersInCoursesSlice.js";
import { useState } from "react";
import { motion } from "framer-motion";
import ErrorMessage from "../components/ErrorMessage";
import DatePicker from "../components/DatePicker.jsx";
import { AiOutlineUnorderedList } from 'react-icons/ai';

const TrainersInCoursesPage = () => {
  const dispatch = useDispatch();
  const trainers = useSelector((state) => state.trainers.trainers);
  const courses = useSelector((state) => state.courses.courses);
  const assignments = useSelector(
    (state) => state.trainersInCourses.assignments
  );

  const [selectedTrainer, setSelectedTrainer] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  const handleAssign = () => {
    if (!selectedTrainer || !selectedCourse || !startDate || !endDate) {
      setError("All fields are required.");
      return;
    }

    dispatch(
      assignTrainerToCourse({
        trainerId: selectedTrainer,
        courseId: selectedCourse,
        startDate,
        endDate,
      })
    );

    setSelectedTrainer("");
    setSelectedCourse("");
    setStartDate("");
    setEndDate("");
    setError("");
  };

  const handleRemove = (id) => {
    dispatch(removeTrainerFromCourse(id));
  };

  const handleCloseError = () => setError("");

  return (
    <div className="p-6 bg-[#1D1D1F] text-white min-h-screen w-[90%] mx-auto my-5">
      <h1 className="text-3xl font-semibold my-5 text-center">
        Assign Trainers to Courses
      </h1>

      {/* Error Message */}
      <ErrorMessage message={error} onClose={handleCloseError} />

      {/* Assignment Form */}
      <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
  className="bg-[#2C2C2E] p-6 rounded-lg mb-6"
>
  {/* Trainer and Course Selection */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Trainer Selection */}
    <div>
      <label className="block mb-2 text-white">Select Trainer</label>
      <select
        value={selectedTrainer}
        onChange={(e) => setSelectedTrainer(e.target.value)}
        className="w-full p-2 rounded-md bg-[#2C2C2E] text-white border border-[#3A3A3C] focus:ring-[#FFDE00] focus:outline-none focus:ring-2"
      >
        <option value="" className="text-gray-400">
          -- Select Trainer --
        </option>
        {trainers.map((trainer) => (
          <option
            key={trainer.id}
            value={trainer.id}
            className="text-black"
          >
            {trainer.fullName}
          </option>
        ))}
      </select>
    </div>

    {/* Course Selection */}
    <div>
      <label className="block mb-2 text-white">Select Course</label>
      <select
        value={selectedCourse}
        onChange={(e) => setSelectedCourse(e.target.value)}
        className="w-full p-2 rounded-md bg-[#2C2C2E] text-white border border-[#3A3A3C] focus:outline-none focus:ring-2 focus:ring-[#FFDE00]"
      >
        <option value="" className="text-gray-400">
          -- Select Course --
        </option>
        {courses.map((course) => (
          <option
            key={course.id}
            value={course.id}
            className="text-black"
          >
            {course.name}
          </option>
        ))}
      </select>
    </div>
  </div>

  {/* Date Picker Section */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
    <DatePicker
      label="Start Date"
      value={startDate}
      onChange={setStartDate}
    />
    <DatePicker
      label="End Date"
      value={endDate}
      onChange={setEndDate}
    />
  </div>

  {/* Assign Button */}
  <button
    onClick={handleAssign}
    className="bg-[#FFDE00] text-black p-3 rounded-lg mt-4 w-full hover:bg-[#e6c200] transition-all"
  >
    Assign Trainer
  </button>
</motion.div>


      {/* Display Assignments */}
      <ul className="space-y-5 w-[90%] mx-auto">
  {assignments.map((assignment) => (
    <motion.li
    key={assignment.id}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    className="bg-[#3A3A3C] p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0"
  >
    {/* Icon and Details Section */}
    <div className="flex items-center space-x-4 w-full md:w-auto">
      {/* Icon Section */}
      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
        <AiOutlineUnorderedList className="text-xl text-gray-700" />
      </div>
  
      {/* Trainer Details */}
      <div>
        <p>
          Trainer:{" "}
          {trainers.find((t) => t.id == assignment.trainerId)?.fullName}
        </p>
        <p>
          Course:{" "}
          {courses.find((c) => c.id == assignment.courseId)?.name}
        </p>
        <p>
          Duration: {assignment.startDate} To {assignment.endDate}
        </p>
      </div>
    </div>
  
    {/* Remove Button */}
    <button
      onClick={() => handleRemove(assignment.id)}
      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition-all duration-300 ease-in-out transform hover:scale-102 w-full md:w-auto"
    >
      Remove
    </button>
  </motion.li>
  
  ))}
</ul>
    </div>
  );
};

export default TrainersInCoursesPage;
