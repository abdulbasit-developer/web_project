'use client';

import { useSession } from 'next-auth/react';
import FileUpload from './components/FileUpload';
import SummaryResult from './components/SummaryResult';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import ApiKeyMissingAlert from './components/ApiKeyMissingAlert';
import AuthButton from './components/AuthButton';
import { usePdfProcessor } from './hooks/usePdfProcessor';

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

  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-50">
        <LoadingSpinner />
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-between p-6 md:p-16 bg-gray-50">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Research Summarizer</h1>
          <p className="text-xl text-gray-600">
            Upload a Research document to get an AI-generated summary
          </p>
        </div>

        {!session ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="mb-6">
              <svg
                className="mx-auto h-16 w-16 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign in Required</h2>
              <p className="text-gray-600 mb-6">
                Please sign in with your Google account to access the PDF summarizer.
              </p>
            </div>
            <AuthButton />
          </div>
        ) : (
          <>
            {error && error.includes('API key') ? (
              <ApiKeyMissingAlert onDismiss={dismissError} />
            ) : error ? (
              <ErrorMessage message={error} onDismiss={dismissError} />
            ) : null}

            {isLoading && <LoadingSpinner />}

            <div className="bg-white rounded-lg shadow-md p-6">
              {!hasResult ? (
                <FileUpload onFileUpload={processPdf} isLoading={isLoading} />
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
          </>
        )}
      </div>
    </div>
  );
}