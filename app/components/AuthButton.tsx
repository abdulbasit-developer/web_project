'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { FaGoogle, FaSignOutAlt, FaUser } from 'react-icons/fa'

export default function AuthButton() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="flex items-center space-x-2">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
        <span className="text-gray-600">Loading...</span>
      </div>
    )
  }

  if (session) {
    return (
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          {session.user?.image && (
            <img
              src={session.user.image}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
          )}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">
              {session.user?.name}
            </span>
            <span className="text-xs text-gray-500">
              {session.user?.email}
            </span>
          </div>
        </div>
        <button
          onClick={() => signOut()}
          className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
        >
          <FaSignOutAlt className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => signIn('google', { callbackUrl: '/' })}
      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
    >
      <FaGoogle className="w-4 h-4" />
      <span>Sign in with Google</span>
    </button>
  )
}