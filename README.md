# PDF Summarizer

A Next.js application that uses AI to generate summaries and topic suggestions from uploaded PDF documents. The application leverages LangChain.js and Groq's LLM to process and analyze PDF content.

## Features

- Upload PDF documents via drag-and-drop or file selection
- AI-powered document summarization
- Key topic extraction and suggestions
- Modern, responsive UI with a ChatGPT-like interface
- Error handling and loading states

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **AI/ML**: LangChain.js, Groq LLM (llama-3.3-70b-versatile)
- **PDF Processing**: pdf-parse

## Prerequisites

- Node.js 18.x or later
- Groq API key

## Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd pdf-summarizer
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your Groq API key:

```
GROQ_API_KEY=your_groq_api_key_here
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Upload a PDF document by dragging and dropping it onto the upload area or by clicking to select a file.
2. Click the "Summarize PDF" button to process the document.
3. View the generated summary and key topics.
4. Click "Upload Another PDF" to process a different document.

## Environment Variables

- `GROQ_API_KEY`: Your Groq API key for accessing the LLM service

## Project Structure

```
pdf-summarizer/
├── app/
│   ├── api/
│   │   └── summarize/
│   │       └── route.ts      # API endpoint for PDF processing
│   ├── components/
│   │   ├── ErrorMessage.tsx  # Error display component
│   │   ├── FileUpload.tsx    # PDF upload component
│   │   ├── LoadingSpinner.tsx # Loading indicator
│   │   └── SummaryResult.tsx # Summary display component
│   ├── utils/
│   │   └── pdfProcessor.ts   # PDF processing utilities
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main page component
├── public/                   # Static assets
├── .env.local                # Environment variables (create this file)
├── next.config.ts            # Next.js configuration
├── package.json              # Project dependencies
└── tsconfig.json             # TypeScript configuration
```

## Limitations

- The application is designed to work with text-based PDFs. Scanned documents or PDFs with complex layouts may not be processed accurately.
- There is a file size limit for uploads (default is 4MB for Next.js API routes).
- Processing large documents may take longer and could be subject to token limits from the LLM provider.

## License

[MIT](LICENSE)