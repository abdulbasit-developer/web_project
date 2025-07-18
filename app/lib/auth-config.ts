// This file provides configuration for NextAuth that works in both development and production

// Determine the correct URL for NextAuth
export const getBaseUrl = () => {
  // Check for VERCEL_URL which is provided by Vercel
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // Check for explicitly set NEXTAUTH_URL
  if (process.env.NEXTAUTH_URL) {
    return process.env.NEXTAUTH_URL;
  }
  
  // Default to localhost in development
  return 'http://localhost:3000';
};

// Export the base URL for use in other files
export const baseUrl = getBaseUrl();