'use client';

import FileUpload from './components/FileUpload';
import SummaryResult from './components/SummaryResult';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import ApiKeyMissingAlert from './components/ApiKeyMissingAlert';
import { usePdfProcessor } from './hooks/usePdfProcessor';

export default function Home() {
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

  return (
    <div className="flex flex-col items-center justify-between p-6 md:p-16 bg-gray-50">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Research Summarizer</h1>
          <p className="text-xl text-gray-600">
            Upload a Research document to get an AI-generated summary
          </p>
        </div>

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
      </div>
    </div>
  );
}