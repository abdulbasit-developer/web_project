import React from 'react';
import { FaFile, FaWeight, FaClock } from 'react-icons/fa';

interface ProcessingStatsProps {
  fileName: string;
  fileSize: number;
  processingTime: number;
  darkMode?: boolean;
}

const ProcessingStats: React.FC<ProcessingStatsProps> = ({
  fileName,
  fileSize,
  processingTime,
  darkMode = false,
}) => {
  // Format file size to KB or MB
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(2)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div>
      <h3 className={`text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
        Document Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`flex items-start ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <div className={`p-2 rounded-md mr-3 ${darkMode ? 'bg-gray-600' : 'bg-blue-100'}`}>
            <FaFile className={darkMode ? 'text-blue-300' : 'text-blue-500'} />
          </div>
          <div>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>File Name</p>
            <p className={`text-sm font-medium truncate max-w-[180px]`} title={fileName}>
              {fileName}
            </p>
          </div>
        </div>
        
        <div className={`flex items-start ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <div className={`p-2 rounded-md mr-3 ${darkMode ? 'bg-gray-600' : 'bg-green-100'}`}>
            <FaWeight className={darkMode ? 'text-green-300' : 'text-green-500'} />
          </div>
          <div>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>File Size</p>
            <p className="text-sm font-medium">{formatFileSize(fileSize)}</p>
          </div>
        </div>
        
        <div className={`flex items-start ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <div className={`p-2 rounded-md mr-3 ${darkMode ? 'bg-gray-600' : 'bg-purple-100'}`}>
            <FaClock className={darkMode ? 'text-purple-300' : 'text-purple-500'} />
          </div>
          <div>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Processing Time</p>
            <p className="text-sm font-medium">{processingTime.toFixed(2)} seconds</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingStats;