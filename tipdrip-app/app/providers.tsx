'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from "next-auth/react" // 1. Import SessionProvider

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CacheProvider>
        <ChakraProvider>
          {children}
        </ChakraProvider>
      </CacheProvider>
    </SessionProvider>
  )
}