import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Research Summarizer. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <span className="sr-only">Privacy Policy</span>
              <span className="text-sm">Privacy Policy</span>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <span className="sr-only">Terms of Service</span>
              <span className="text-sm">Terms of Service</span>
            </a>
          </div>
        </div>
        <div className="mt-4 text-center text-xs text-gray-400">
          <p>Powered by LangChain.js and Google LLM</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;