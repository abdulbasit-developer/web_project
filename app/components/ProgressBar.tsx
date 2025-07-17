'use client';

import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, label }) => {
  // Ensure progress is between 0 and 100
  const normalizedProgress = Math.min(100, Math.max(0, progress));
  
  return (
    <div className="w-full">
      {label && <div className="text-sm text-gray-600 mb-1">{label}</div>}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${normalizedProgress}%` }}
        ></div>
      </div>
      <div className="text-xs text-gray-500 mt-1 text-right">{Math.round(normalizedProgress)}%</div>
    </div>
  );
};

export default ProgressBar;