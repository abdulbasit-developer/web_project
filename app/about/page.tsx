'use client';

import React from 'react';
import Link from 'next/link';

export default function About() {
  return (
    <div className="flex flex-col items-center justify-between p-6 md:p-16 bg-gray-50">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Research Summarizer</h1>
          <p className="text-xl text-gray-600">
            Learn more about our AI-powered Research summarization tool
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="prose max-w-none">
            <h2>What is Research Summarizer?</h2>
            <p>
            Research Summarizer is an AI-powered tool that helps you extract the key information from Research documents.
              Upload any Research, and our application will generate a concise summary and identify the main topics
              covered in the document.
            </p>

            <h2>How It Works</h2>
            <p>
              Our application uses advanced natural language processing techniques powered by LangChain.js and
              Groq's LLM (Large Language Model) to analyze and understand the content of your Research documents.
              The process involves:
            </p>
            <ol>
              <li>Extracting text from the uploaded Research</li>
              <li>Processing the text using Groq's llama-3.3-70b-versatile model</li>
              <li>Generating a comprehensive summary of the document's content</li>
              <li>Identifying key topics and themes for further exploration</li>
            </ol>

            <h2>Features</h2>
            <ul>
              <li>Upload Research documents via drag-and-drop or file selection</li>
              <li>Generate concise summaries of document content</li>
              <li>Identify key topics and themes</li>
              <li>Copy, download, or share summaries</li>
              <li>Process documents of various sizes and complexities</li>
            </ul>

            <h2>Privacy & Security</h2>
            <p>
              We take your privacy seriously. Research documents are processed securely and are not stored permanently
              on our servers. All temporary files are deleted after processing is complete.
            </p>

            <h2>Limitations</h2>
            <p>
              While our tool is powerful, it does have some limitations:
            </p>
            <ul>
              <li>Works best with text-based Researchs (scanned documents may not be processed accurately)</li>
              <li>There is a file size limit for uploads</li>
              <li>Processing large documents may take longer</li>
              <li>Complex tables, charts, and images are not included in the summary</li>
            </ul>

            <div className="mt-8 text-center">
              <Link href="/" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  ></path>
                </svg>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}