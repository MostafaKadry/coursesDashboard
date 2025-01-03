'use client';
import React from "react";

const DatePicker = ({ label, value, onChange }) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-white">
        {label}
      </label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 rounded-md bg-[#2C2C2E] text-white border border-[#3A3A3C] focus:outline-none focus:ring-2 focus:ring-[#FFDE00]"
      />
    </div>
  );
};

export default DatePicker;
