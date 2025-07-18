import React, { useState, useEffect } from 'react';
import ProcessingStats from './ProcessingStats';
import CopyButton from './CopyButton';
import DownloadButton from './DownloadButton';
import ShareButton from './ShareButton';
import MarkdownRenderer from './MarkdownRenderer';
import { FaFilePdf, FaArrowLeft, FaLightbulb, FaRegLightbulb } from 'react-icons/fa';

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
  const [isVisible, setIsVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => {
      setAnimateIn(true);
    }, 100);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div 
      className={`w-full mx-auto bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-500 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className={`p-2 rounded-lg mr-3 ${darkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
              <FaFilePdf className={`h-6 w-6 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`} />
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                PDF Summary
              </h2>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                AI-generated analysis
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-yellow-300' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FaLightbulb /> : <FaRegLightbulb />}
            </button>
            <button
              onClick={onReset}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <FaArrowLeft className="w-4 h-4" />
              <span>New Summary</span>
            </button>
          </div>
        </div>

        {fileSize > 0 && (
          <div className={`mb-6 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
            <ProcessingStats
              fileName={fileName}
              fileSize={fileSize}
              processingTime={processingTime}
              darkMode={darkMode}
            />
          </div>
        )}

        <div className={`mb-8 transition-all duration-500 transform ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Summary
            </h3>
            <div className="flex space-x-2">
              <DownloadButton 
                content={summary} 
                fileName={`${fileName.replace('.pdf', '')}_summary.txt`} 
                label="Download" 
                darkMode={darkMode}
              />
              <CopyButton text={summary} label="Copy" darkMode={darkMode} />
              <ShareButton title="PDF Summary" text={summary} darkMode={darkMode} />
            </div>
          </div>
          <div className={`p-5 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
            <MarkdownRenderer content={summary} darkMode={darkMode} />
          </div>
        </div>

        {topics && topics.length > 0 && (
          <div className={`transition-all duration-500 delay-300 transform ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Key Topics
            </h3>
            <div className="flex flex-wrap gap-2">
              {topics.map((topic, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm transition-all hover:scale-105 ${
                    darkMode 
                      ? 'bg-blue-900 text-blue-200' 
                      : 'bg-blue-100 text-blue-800'
                  }`}
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