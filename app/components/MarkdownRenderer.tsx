'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  return (
    <div className={`markdown-body ${className}`}>
      <ReactMarkdown>{content}</ReactMarkdown>
      <style jsx global>{`
        .markdown-body {
          color: #24292e;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
          font-size: 16px;
          line-height: 1.5;
          word-wrap: break-word;
        }
        
        .markdown-body h1 {
          font-size: 2em;
          margin: 0.67em 0;
          font-weight: 600;
        }
        
        .markdown-body h2 {
          font-size: 1.5em;
          margin-top: 1em;
          margin-bottom: 0.5em;
          font-weight: 600;
        }
        
        .markdown-body h3 {
          font-size: 1.25em;
          margin-top: 1em;
          margin-bottom: 0.5em;
          font-weight: 600;
        }
        
        .markdown-body p {
          margin-top: 0;
          margin-bottom: 16px;
        }
        
        .markdown-body ul, .markdown-body ol {
          margin-top: 0;
          margin-bottom: 16px;
          padding-left: 2em;
        }
        
        .markdown-body ul {
          list-style-type: disc;
        }
        
        .markdown-body ol {
          list-style-type: decimal;
        }
        
        .markdown-body li {
          margin-top: 0.25em;
        }
        
        .markdown-body blockquote {
          padding: 0 1em;
          color: #6a737d;
          border-left: 0.25em solid #dfe2e5;
          margin: 0 0 16px 0;
        }
        
        .markdown-body code {
          padding: 0.2em 0.4em;
          margin: 0;
          font-size: 85%;
          background-color: rgba(27, 31, 35, 0.05);
          border-radius: 3px;
          font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
        }
        
        .markdown-body pre {
          word-wrap: normal;
          padding: 16px;
          overflow: auto;
          font-size: 85%;
          line-height: 1.45;
          background-color: #f6f8fa;
          border-radius: 3px;
          margin-bottom: 16px;
        }
        
        .markdown-body pre code {
          display: inline;
          max-width: auto;
          padding: 0;
          margin: 0;
          overflow: visible;
          line-height: inherit;
          word-wrap: normal;
          background-color: transparent;
          border: 0;
        }
        
        .markdown-body a {
          color: #0366d6;
          text-decoration: none;
        }
        
        .markdown-body a:hover {
          text-decoration: underline;
        }
        
        .markdown-body table {
          border-spacing: 0;
          border-collapse: collapse;
          margin-bottom: 16px;
          width: 100%;
          overflow: auto;
        }
        
        .markdown-body table th {
          font-weight: 600;
          padding: 6px 13px;
          border: 1px solid #dfe2e5;
        }
        
        .markdown-body table td {
          padding: 6px 13px;
          border: 1px solid #dfe2e5;
        }
        
        .markdown-body table tr {
          background-color: #fff;
          border-top: 1px solid #c6cbd1;
        }
        
        .markdown-body table tr:nth-child(2n) {
          background-color: #f6f8fa;
        }
      `}</style>
    </div>
  );
};

export default MarkdownRenderer;