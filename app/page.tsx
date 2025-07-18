'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import FileUpload from './components/FileUpload';
import SummaryResult from './components/SummaryResult';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import ApiKeyMissingAlert from './components/ApiKeyMissingAlert';
import AuthButton from './components/AuthButton';
import { usePdfProcessor } from './hooks/usePdfProcessor';
import { FaLock, FaRobot, FaFileAlt, FaChartBar } from 'react-icons/fa';

export default function Home() {
  const { data: session, status } = useSession();
  const {
    isLoading,
    error,
    summary,
    topics,
    hasResult,
    fileName,
    fileSize,
    processingTime,
    processPdf,
    reset,
    dismissError
  } = usePdfProcessor();
  
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-b from-gray-50 to-white">
        <div className="animate-pulse">
          <LoadingSpinner />
        </div>
        <p className="mt-4 text-gray-600 animate-pulse">Loading your session...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-between p-6 md:p-16 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Background elements for visual appeal */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 rounded-full opacity-20 blur-3xl"></div>
      </div>
      
      <div className="w-full max-w-4xl relative z-10">
        <div className={`text-center mb-10 transition-all duration-700 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            AI Research Summarizer
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform complex research documents into clear, concise summaries with our AI-powered tool
          </p>
        </div>

        {!session ? (
          <div className={`bg-white rounded-xl shadow-lg p-8 text-center transition-all duration-700 delay-300 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="mb-8">
              <div className="mx-auto h-20 w-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-6">
                <FaLock className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Sign in Required</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Please sign in with your Google account to access the AI-powered PDF summarizer and unlock all features.
              </p>
            </div>
            
            <AuthButton />
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-lg bg-blue-50 flex flex-col items-center">
                <div className="p-3 bg-blue-100 rounded-full mb-3">
                  <FaFileAlt className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">PDF Processing</h3>
                <p className="text-sm text-gray-600 text-center">Upload and process any research PDF document</p>
              </div>
              
              <div className="p-4 rounded-lg bg-indigo-50 flex flex-col items-center">
                <div className="p-3 bg-indigo-100 rounded-full mb-3">
                  <FaRobot className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">AI Summary</h3>
                <p className="text-sm text-gray-600 text-center">Get intelligent summaries powered by advanced AI</p>
              </div>
              
              <div className="p-4 rounded-lg bg-purple-50 flex flex-col items-center">
                <div className="p-3 bg-purple-100 rounded-full mb-3">
                  <FaChartBar className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Key Insights</h3>
                <p className="text-sm text-gray-600 text-center">Extract the most important information automatically</p>
              </div>
            </div>
          </div>
        ) : (
          <div className={`transition-all duration-700 delay-300 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {error && error.includes('API key') ? (
              <ApiKeyMissingAlert onDismiss={dismissError} />
            ) : error ? (
              <ErrorMessage message={error} onDismiss={dismissError} />
            ) : null}

            {isLoading && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-8 rounded-xl shadow-2xl flex flex-col items-center">
                  <LoadingSpinner size="large" />
                  <p className="mt-4 text-gray-700 font-medium">Processing your document...</p>
                  <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
                </div>
              </div>
            )}

            <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${hasResult ? 'p-0' : 'p-6'}`}>
              {!hasResult ? (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Your Research Document</h2>
                  <FileUpload onFileUpload={processPdf} isLoading={isLoading} />
                </div>
              ) : (
                <SummaryResult 
                  summary={summary} 
                  topics={topics} 
                  onReset={reset}
                  fileName={fileName}
                  fileSize={fileSize}
                  processingTime={processingTime}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}