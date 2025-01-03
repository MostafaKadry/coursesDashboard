'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaChalkboardTeacher } from 'react-icons/fa';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#1D1D1F] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold hover:text-gray-400">
          <FaChalkboardTeacher className="text-4xl text-green-500 inline-block mx-4"/>
            CoursesApp
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden text-gray-300 hover:text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? '✖' : '☰'}
          </button>

          {/* Menu Items */}
          <ul className="hidden sm:flex space-x-6">
            <li>
              <Link href="/courses" className="hover:text-gray-400">
                Courses
              </Link>
            </li>
            <li>
              <Link href="/trainers" className="hover:text-gray-400">
                Trainers
              </Link>
            </li>
            <li>
              <Link href="/manage_trainers_in_course" className="hover:text-gray-400">
              Registers
              </Link>
            </li>
            <li>
              <Link href="/payments" className="hover:text-gray-400">
                Payments
              </Link>
            </li>
            <li>
              <Link href='/login' className="hover:text-gray-400">Login</Link>
            </li>
          </ul>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <ul className="sm:hidden mt-4 space-y-2">
            <li>
              <Link href="/courses" className="block py-2 px-4 hover:bg-gray-700 rounded-md">
                Courses
              </Link>
            </li>
            <li>
              <Link href="/trainers" className="block py-2 px-4 hover:bg-gray-700 rounded-md">
                Trainers
              </Link>
            </li>
            <li>
              <Link href="/manage_trainers_in_course" className="block py-2 px-4 hover:bg-gray-700 rounded-md">
                Registers
              </Link>
            </li>
            <li>
              <Link href="/payments" className="block py-2 px-4 hover:bg-gray-700 rounded-md">
                Payments
              </Link>
            </li>
            <li>
              <Link href="/login" className="block py-2 px-4 hover:bg-gray-700 rounded-md">
                Login
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
