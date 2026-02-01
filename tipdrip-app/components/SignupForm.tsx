'use client'
import React from 'react'
import { signIn } from "next-auth/react" // Fixed: Added import

import { 
  Box, 
  Button, 
  Center, 
  FormControl, 
  FormLabel, 
  Heading, 
  Input, 
  Stack, 
  Text, 
  VStack, 
  Link,
  HStack,
  Divider,
  AbsoluteCenter
} from "@chakra-ui/react"

export default function SignupForm(props: React.ComponentProps<typeof Box>) {
  return (
    <Box maxW="sm" mx="auto" p={4} {...props}>
      <VStack spacing={6} align="stretch">
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack spacing={4}>
            
            {/* Header / Logo Section */}
            <VStack spacing={2} textAlign="center">
              <Heading size="md">Welcome to tipdrip</Heading>
              <Text color="gray.500" fontSize="sm">
                Please sign in to see your dashboard
              </Text>
            </VStack>

            {/* Email Field */}
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="m@example.com"
                focusBorderColor="blue.500"
              />
            </FormControl>

            <Button colorScheme="blue" width="full" type="submit">
              Sign in
            </Button>

            {/* Separator (Divider with centered text) */}
            <Box position="relative" py={4}>
              <Divider />
              <AbsoluteCenter bg="white" px={2}>
                <Text fontSize="xs" color="gray.500" fontWeight="bold">OR</Text>
              </AbsoluteCenter>
            </Box>

            {/* Social Login */}
            <Button 
              variant="outline" 
              width="full" 
              leftIcon={<GoogleIcon />}
              onClick={() => signIn("google", { callbackUrl: "/onboarding/create-account" })}
            >
              Continue with Google
            </Button>
          </Stack>
        </form>

        {/* Footer Text */}
        <Text fontSize="xs" color="gray.500" textAlign="center" px={6}>
          By clicking continue, you agree to our{" "}
          <Link href="#" color="blue.500">Terms of Service</Link>{" "}
          and <Link href="#" color="blue.500">Privacy Policy</Link>.
        </Text>
      </VStack>
    </Box>
  ); // Fixed: Properly closed return
} // Fixed: Properly closed function

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path
      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
      fill="currentColor"
    />
  </svg>
)