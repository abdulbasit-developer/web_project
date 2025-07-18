import React, { useState, useRef, useEffect } from 'react';
import { FaFilePdf, FaUpload, FaCheck, FaTimes } from 'react-icons/fa';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  isLoading: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, isLoading }) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileSize, setFileSize] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  // Simulate upload progress when a file is selected
  useEffect(() => {
    if (selectedFile && !isLoading) {
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [selectedFile, isLoading]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setError(null);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
        setFileSize(formatFileSize(file.size));
      } else {
        setError('Please upload a PDF file');
        setTimeout(() => setError(null), 3000);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setError(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
        setFileSize(formatFileSize(file.size));
      } else {
        setError('Please upload a PDF file');
        setTimeout(() => setError(null), 3000);
      }
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
    }
  };

  const openFileSelector = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    setFileSize('');
    setUploadProgress(0);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center h-72 cursor-pointer transition-all duration-300 ${
          dragActive 
            ? 'border-blue-500 bg-blue-50 scale-105 shadow-lg' 
            : selectedFile 
              ? 'border-green-500 bg-green-50' 
              : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/30'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={openFileSelector}
      >
        {/* Background pattern for visual appeal */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0 bg-grid-pattern"></div>
        </div>
        
        {!selectedFile ? (
          <>
            <div className="relative z-10 bg-blue-100 rounded-full p-4 mb-4 group-hover:bg-blue-200 transition-colors">
              <FaUpload className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-lg font-medium text-gray-700 mb-2 text-center">
              {dragActive ? 'Drop your PDF here' : 'Drag & drop your PDF file here'}
            </p>
            <p className="text-sm text-gray-500 mb-4 text-center">or click to browse files</p>
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
              <span className="flex items-center">
                <FaFilePdf className="mr-1" /> PDF files only
              </span>
              <span>•</span>
              <span>Max 10MB</span>
            </div>
          </>
        ) : (
          <div className="w-full">
            <div className="flex items-center mb-4">
              <div className="bg-white rounded-lg p-3 mr-3 shadow-sm">
                <FaFilePdf className="w-8 h-8 text-red-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 truncate">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">{fileSize}</p>
              </div>
              <button 
                onClick={removeFile}
                className="ml-2 p-2 rounded-full hover:bg-gray-200 transition-colors"
              >
                <FaTimes className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1 text-right">{uploadProgress}% ready</p>
          </div>
        )}
        
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="application/pdf"
          onChange={handleChange}
        />
      </div>

      {error && (
        <div className="mt-3 p-3 bg-red-100 border border-red-200 text-red-700 rounded-md flex items-center">
          <FaTimes className="w-4 h-4 mr-2" />
          {error}
        </div>
      )}

      {selectedFile && (
        <div className="mt-4">
          <button
            onClick={handleSubmit}
            disabled={isLoading || uploadProgress < 100}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center transition-all duration-300 ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : uploadProgress < 100
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg'
            }`}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Processing...
              </>
            ) : (
              <>
                {uploadProgress < 100 ? 'Preparing...' : 'Summarize PDF'}
                {uploadProgress === 100 && <FaCheck className="ml-2" />}
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;