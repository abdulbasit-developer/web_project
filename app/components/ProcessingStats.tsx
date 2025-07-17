import React from 'react';

interface ProcessingStatsProps {
  fileName: string;
  fileSize: number;
  processingTime: number;
}

const ProcessingStats: React.FC<ProcessingStatsProps> = ({
  fileName,
  fileSize,
  processingTime,
}) => {
  // Format file size to KB or MB
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(2)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="bg-gray-50 rounded-md p-4 mb-4">
      <h3 className="text-sm font-medium text-gray-500 mb-2">Processing Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-gray-500">File Name</p>
          <p className="text-sm font-medium text-gray-900 truncate" title={fileName}>
            {fileName}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">File Size</p>
          <p className="text-sm font-medium text-gray-900">{formatFileSize(fileSize)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Processing Time</p>
          <p className="text-sm font-medium text-gray-900">{processingTime.toFixed(2)} seconds</p>
        </div>
      </div>
    </div>
  );
};

export default ProcessingStats;