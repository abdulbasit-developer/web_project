import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  overlay?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Processing your PDF...', 
  size = 'medium',
  overlay = false
}) => {
  const spinnerSizes = {
    small: 'h-6 w-6',
    medium: 'h-10 w-10',
    large: 'h-16 w-16'
  };

  const spinner = (
    <div className="relative">
      {/* Outer spinning circle */}
      <div className={`animate-spin rounded-full ${spinnerSizes[size]} border-4 border-blue-200`}></div>
      
      {/* Inner spinning circle (opposite direction) */}
      <div className={`absolute top-0 left-0 animate-spin-reverse rounded-full ${spinnerSizes[size]} border-4 border-transparent border-t-blue-600 border-b-blue-600`}></div>
      
      {/* Center dot */}
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600 ${
        size === 'small' ? 'h-2 w-2' : size === 'medium' ? 'h-3 w-3' : 'h-4 w-4'
      }`}></div>
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-xl shadow-xl flex flex-col items-center max-w-md mx-auto">
          {spinner}
          <p className="text-gray-700 font-medium mt-6">{message}</p>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-blue-600 h-1.5 rounded-full animate-progress"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {spinner}
      {message && <p className="text-gray-600 mt-4">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;