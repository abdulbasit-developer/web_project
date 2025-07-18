'use client';

import React, { useState } from 'react';

interface ShareButtonProps {
  title: string;
  text: string;
  darkMode?: boolean;
}

const ShareButton: React.FC<ShareButtonProps> = ({ title, text, darkMode = false }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleShare = async () => {
    // Check if the Web Share API is available
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
        });
      } catch (error) {
        console.error('Error sharing:', error);
        fallbackShare();
      }
    } else {
      fallbackShare();
    }
  };

  const fallbackShare = () => {
    // Fallback for browsers that don't support the Web Share API
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={handleShare}
        className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          darkMode 
            ? 'bg-purple-900 text-purple-200 hover:bg-purple-800' 
            : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
        }`}
      >
        <svg
          className="w-4 h-4 mr-1.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          ></path>
        </svg>
        Share
      </button>
      {showTooltip && (
        <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-xs rounded-md whitespace-nowrap ${
          darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-800 text-white'
        }`}>
          Share functionality not available
          <div className={`absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent ${
            darkMode ? 'border-t-gray-700' : 'border-t-gray-800'
          }`}></div>
        </div>
      )}
    </div>
  );
};

export default ShareButton;