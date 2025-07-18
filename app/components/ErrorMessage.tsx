import React, { useState, useEffect } from 'react';
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa';

interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Animate in
    setIsVisible(true);
    
    // Auto-dismiss after 10 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onDismiss, 300); // Wait for animation to complete
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [onDismiss]);
  
  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(onDismiss, 300); // Wait for animation to complete
  };
  
  return (
    <div 
      className={`bg-gradient-to-r from-red-50 to-red-100 border border-red-200 p-4 mb-6 rounded-lg shadow-md transition-all duration-300 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 bg-red-100 rounded-full p-2">
          <FaExclamationTriangle className="h-5 w-5 text-red-600" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800">Error</h3>
          <div className="mt-1">
            <p className="text-sm text-red-700">{message}</p>
          </div>
          <div className="mt-3">
            <button
              type="button"
              onClick={handleDismiss}
              className="inline-flex items-center px-3 py-1.5 border border-red-300 text-xs font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              onClick={handleDismiss}
              className="inline-flex rounded-full p-1.5 text-red-500 hover:bg-red-200 transition-colors"
            >
              <span className="sr-only">Dismiss</span>
              <FaTimes className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Progress bar for auto-dismiss */}
      <div className="mt-3 w-full bg-red-200 rounded-full h-1">
        <div 
          className="bg-red-500 h-1 rounded-full transition-all duration-[10000ms] ease-linear"
          style={{ width: isVisible ? '0%' : '100%' }}
        ></div>
      </div>
    </div>
  );
};

export default ErrorMessage;