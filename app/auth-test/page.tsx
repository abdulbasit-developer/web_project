'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function AuthTest() {
  const { data: session, status } = useSession()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Authentication Test Page</h1>
        
        <div className="mb-6 p-4 bg-gray-100 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Session Status:</h2>
          <p className="font-mono">{status}</p>
          
          <h2 className="text-lg font-semibold mt-4 mb-2">Session Data:</h2>
          <pre className="bg-gray-200 p-2 rounded overflow-auto text-xs">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
        
        <div className="flex justify-center">
          <Link 
            href="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}