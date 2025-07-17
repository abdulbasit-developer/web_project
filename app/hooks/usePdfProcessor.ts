'use client';

import { useState } from 'react';

interface UsePdfProcessorResult {
  isLoading: boolean;
  error: string | null;
  summary: string;
  topics: string[];
  hasResult: boolean;
  fileName: string;
  fileSize: number;
  processingTime: number;
  processPdf: (file: File) => Promise<void>;
  reset: () => void;
  dismissError: () => void;
}

export function usePdfProcessor(): UsePdfProcessorResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<string>('');
  const [topics, setTopics] = useState<string[]>([]);
  const [hasResult, setHasResult] = useState(false);
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<number>(0);
  const [processingTime, setProcessingTime] = useState<number>(0);

  const processPdf = async (file: File) => {
    if (!file || file.type !== 'application/pdf') {
      setError('Please select a valid PDF file.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setFileName(file.name);
    setFileSize(file.size);
    
    const startTime = performance.now();

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/summarize', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process PDF');
      }

      const data = await response.json();
      setSummary(data.summary);
      setTopics(data.topics || []);
      setHasResult(true);
      
      // Calculate processing time in seconds
      const endTime = performance.now();
      setProcessingTime((endTime - startTime) / 1000);
    } catch (error) {
      console.error('Error processing PDF:', error);
      setError(error instanceof Error ? error.message : 'Failed to process PDF. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setSummary('');
    setTopics([]);
    setHasResult(false);
  };

  const dismissError = () => {
    setError(null);
  };

  return {
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
    dismissError,
  };
}