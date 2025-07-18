'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AuthButton from './AuthButton';
import { FaBook, FaGithub, FaInfoCircle } from 'react-icons/fa';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  
  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-md' 
          : 'bg-white shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="relative overflow-hidden rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 p-2 transition-all duration-300 group-hover:scale-110">
                <FaBook className="h-5 w-5 text-white" />
              </div>
              <div className="ml-3 flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Research Summarizer
                </span>
                <span className="text-xs text-gray-500">AI-Powered Analysis</span>
              </div>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link 
              href="/about" 
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <FaInfoCircle className="h-4 w-4" />
              <span>About</span>
            </Link>
            <a
              href="https://github.com/abdulbasit-developer"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <FaGithub className="h-5 w-5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <AuthButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;