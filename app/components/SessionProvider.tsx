'use client'

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SessionProvider({ children }: Props) {
  return (
    <NextAuthSessionProvider 
      // Don't re-fetch session on every navigation
      refetchInterval={0} 
      refetchOnWindowFocus={false}
    >
      {children}
    </NextAuthSessionProvider>
  )
}