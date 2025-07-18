import React from 'react';
import { FaBook, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          {/* Logo and name */}
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-lg mr-2">
              <FaBook className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Research Summarizer
            </span>
          </div>

          {/* Navigation links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8">
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
            >
              Features
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
            >
              Contact
            </a>
          </div>

          {/* Social links */}
          <div className="flex space-x-4 mb-6">
            <a
              href="https://github.com/abdulbasit-developer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-200"
            >
              <FaGithub className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-gray-200"
            >
              <FaTwitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-800 transition-colors p-2 rounded-full hover:bg-gray-200"
            >
              <FaLinkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Research Summarizer. All rights reserved.
            </p>
            <p className="mt-2 text-xs text-gray-400 flex items-center justify-center">
              <span className="inline-block bg-gradient-to-r from-blue-500 to-indigo-500 h-1 w-1 rounded-full mr-1"></span>
              Powered by LangChain.js and Google Gemini AI
              <span className="inline-block bg-gradient-to-r from-indigo-500 to-blue-500 h-1 w-1 rounded-full ml-1"></span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;