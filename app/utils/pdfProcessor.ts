import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { ChatGroq } from "@langchain/groq";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import fs from 'fs';
import path from 'path';
import os from 'os';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// Check if API key is available
if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'your_groq_api_key_here') {
  console.error('GROQ_API_KEY is missing or using the default value. Please set a valid API key in .env.local');
}

// Initialize the LLM
const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-pro",
  temperature: 0
});

// Function to save uploaded PDF temporarily
export const savePdfTemporarily = async (file: File): Promise<string> => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Create a temporary file path
  const tempDir = os.tmpdir();
  const filePath = path.join(tempDir, `upload-${Date.now()}.pdf`);

  // Write the file
  fs.writeFileSync(filePath, buffer);
  return filePath;
};

// Function to summarize PDF
export const summarizePdf = async (filePath: string): Promise<{ summary: string }> => {
  try {
    // Load the PDF
    const loader = new PDFLoader(filePath);
    const docs = await loader.load();

    // Create summary prompt
    const summaryPrompt = PromptTemplate.fromTemplate(
      "You are a helpful assistant that summarizes research documents.and also sugest future study areas.donot output Of course. Here is a summary of the main points and key information from the research paper.start with summary . Summarize the main points and key information from the following document: {context}"
    );

    // Create summary chain
    const summaryChain = await createStuffDocumentsChain({
      llm,
      outputParser: new StringOutputParser(),
      prompt: summaryPrompt,
    });

    // Get summary
    const summary = await summaryChain.invoke({ context: docs });

    // Clean up the temporary file
    try {
      fs.unlinkSync(filePath);
    } catch (error) {
      console.error('Error deleting temporary file:', error);
    }

    return { summary };
  } catch (error) {
    console.error('Error processing PDF:', error);
    throw new Error('Failed to process PDF');
  }
};