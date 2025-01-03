"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import DatePicker from "../components/DatePicker";
import ErrorMessage from "../components/ErrorMessage";
import { addPayment } from "../../redux/payments/paymentsSlice.js";
import { v4 as uuidv4 } from 'uuid'; 
import {AiOutlineDollarCircle} from 'react-icons/ai';
const PaymentsPage = () => {
  const [selectedAssignment, setSelectedAssignment] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [error, setError] = useState(""); 

  const dispatch = useDispatch(); // Access the dispatch function

  // Get trainers, courses, and assignments from Redux store
  const trainers = useSelector((state) => state.trainers.trainers);
  const courses = useSelector((state) => state.courses.courses);
  const assignments = useSelector(
    (state) => state.trainersInCourses.assignments
  );
  const payments = useSelector((state) => state.payments.payments); // Get current payments from Redux store

  // Combine trainers and courses based on assignments
  const assignmentOptions = assignments
    .map((assignment) => {
      const trainer = trainers.find((t) => t.id == assignment.trainerId);
      const course = courses.find((c) => c.id == assignment.courseId);

      return {
        id: assignment.id,
        trainerName: trainer?.fullName,
        courseName: course?.name,
        price: course?.price,
      };
    })
    .filter((assignmentOption) => {
      // Check if there's a payment for the assignment
      return !payments.some(
        (payment) => payment.assignmentId == assignmentOption.id
      );
    });



  const handleAddPayment = () => {
    if (!selectedAssignment || !paymentDate) {
      setError("All fields are required");
      return;
    }

    const selectedAssignmentData = assignmentOptions.find(
      (assignment) => assignment.id == selectedAssignment
    );

    const newPayment = {
      transaction_id: uuidv4(), // Random transaction ID
      assignmentId: selectedAssignment,
      date_of_payment: paymentDate,
      price: selectedAssignmentData.price,
      trainerName: selectedAssignmentData.trainerName,
      courseName: selectedAssignmentData.courseName,
    };

    // Dispatch the action to add the new payment to the Redux store
    dispatch(addPayment(newPayment));

    setError(""); // Clear error message after successful submission
  };

  return (
    <div className="p-6 bg-[#1D1D1F] text-white min-h-screen w-[90%] mx-auto my-5">
      <h1 className="text-3xl font-semibold mb-4 text-center">Payments Page</h1>

      {/* Error Message */}
      {error && <ErrorMessage message={error} onClose={() => setError("")} />}

      {/* Payment Form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[#2C2C2E] p-6 rounded-lg mb-6"
      >
        <div>
          <label className="block mb-2 text-white">Select Assignment</label>
          <select
            value={selectedAssignment}
            onChange={(e) => setSelectedAssignment(e.target.value)}
            className="w-full p-2 rounded-md bg-[#2C2C2E] text-white border border-[#3A3A3C] focus:ring-[#FFDE00] focus:outline-none focus:ring-2"
          >
            <option value="" className="text-gray-400">
              -- Select Assignment --
            </option>
            {assignmentOptions.map((assignment) => (
              <option
                key={assignment.id}
                value={assignment.id}
                className="text-black"
              >
                {assignment.trainerName} - {assignment.courseName}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4">
          <DatePicker
            label="Payment Date"
            value={paymentDate}
            onChange={setPaymentDate}
          />
        </div>

        <button
          onClick={handleAddPayment}
          className="bg-[#FFDE00] text-black p-3 rounded-lg mt-4 w-full hover:bg-[#e6c200] transition-all"
        >
          Add Payment
        </button>
      </motion.div>

      {/* Display Payments */}
      <ul className="space-y-4">
        {payments.length === 0 ? (
          <p className="text-white text-center">No payments found</p>
        ) : (
          payments.map((payment) => (
<motion.li
  key={payment.transaction_id}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
  className="bg-[#3A3A3C] p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0"
>
  {/* Icon Section */}
  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center md:mr-4 md:mb-0 mb-2">
    <AiOutlineDollarCircle className="text-2xl text-gray-700 md:text-xl" /> {/* Payment Icon */}
  </div>

  {/* Payment Details */}
  <div className="flex-1">
    <p>Trainer: {payment.trainerName}</p>
    <p>Course: {payment.courseName}</p>
    <p>Date of Payment: {payment.date_of_payment}</p>
    <p>Amount: ${payment.price}</p>
  </div>
</motion.li>

          ))
        )}
      </ul>
    </div>
  );
};

export default PaymentsPage;
