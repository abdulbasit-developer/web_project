import React from 'react';
import ProcessingStats from './ProcessingStats';
import CopyButton from './CopyButton';
import DownloadButton from './DownloadButton';
import ShareButton from './ShareButton';
import MarkdownRenderer from './MarkdownRenderer';

interface SummaryResultProps {
  summary: string;
  topics?: string[];
  onReset: () => void;
  fileName?: string;
  fileSize?: number;
  processingTime?: number;
}

const SummaryResult: React.FC<SummaryResultProps> = ({ 
  summary, 
  topics, 
  onReset,
  fileName = 'document.pdf',
  fileSize = 0,
  processingTime = 0
}) => {
  return (
    <div className="w-full mx-auto bg-white rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">PDF Summary</h2>
          <button
            onClick={onReset}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 transition-colors"
          >
            Upload Another PDF
          </button>
        </div>

        {fileSize > 0 && (
          <ProcessingStats
            fileName={fileName}
            fileSize={fileSize}
            processingTime={processingTime}
          />
        )}

        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            {/* <h3 className="text-lg font-semibold text-gray-700">Summary</h3> */}
            <div className="flex space-x-2">
              <DownloadButton 
                content={summary} 
                fileName={`${fileName.replace('.pdf', '')}_summary.txt`} 
                label="Download" 
              />
              <CopyButton text={summary} label="Copy" />
              <ShareButton title="PDF Summary" text={summary} />
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <MarkdownRenderer content={summary} />
          </div>
        </div>

        {topics && topics.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Key Topics</h3>
            <div className="flex flex-wrap gap-2">
              {topics.map((topic, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryResult;