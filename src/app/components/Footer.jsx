'use client';

import React from 'react';
import Link from 'next/link';
const Footer = () => {
  return (
    <footer className="bg-[#1D1D1F] text-white py-8 mt0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center">
          {/* Logo / Brand Name */}
          <div>
            <h2 className="text-2xl font-bold text-gray-300">CoursesApp</h2>
          </div>

          {/* Links Section */}
          <div className="flex space-x-6">
            <Link href="/about" className="hover:text-gray-400">About Us</Link>
            <Link href="/contact" className="hover:text-gray-400">Contact</Link>
            <Link href="/privacy" className="hover:text-gray-400">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-400">Terms of Service</Link>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-6 text-center text-sm text-gray-400">
          <p>&copy; 2024 CourseApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
