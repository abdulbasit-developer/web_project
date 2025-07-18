'use client';

import React from 'react';

interface DownloadButtonProps {
  content: string;
  fileName: string;
  label?: string;
  darkMode?: boolean;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  content,
  fileName,
  label = 'Download',
  darkMode = false
}) => {
  const handleDownload = () => {
    // Create a blob with the content
    const blob = new Blob([content], { type: 'text/plain' });
    
    // Create a URL for the blob
    const url = URL.createObjectURL(blob);
    
    // Create a temporary anchor element
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    
    // Trigger the download
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium transition-colors ${
        darkMode 
          ? 'bg-blue-900 text-blue-200 hover:bg-blue-800' 
          : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
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
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        ></path>
      </svg>
      {label}
    </button>
  );
};

export default DownloadButton;