'use client';

import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Circle,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

export default function TipSuccessPage() {
  const bgColor = useColorModeValue('white', 'gray.800');
  const checkColor = useColorModeValue('green.500', 'green.300');

  return (
    <Box 
      minH="100vh" 
      display="flex" 
      alignItems="center" 
      justifyContent="center" 
      bg={useColorModeValue('gray.50', 'gray.900')}
      px={4}
    >
      <VStack
        spacing={6}
        p={10}
        bg={bgColor}
        boxShadow="xl"
        borderRadius="2xl"
        maxW="md"
        w="full"
        textAlign="center"
      >
        {/* Animated-style Success Icon */}
        <Circle 
          size="80px" 
          bg="green.50" 
          border="2px solid" 
          borderColor="green.100"
        >
          <Icon as={CheckIcon} w={10} h={10} color={checkColor} />
        </Circle>

        <VStack spacing={2}>
          <Heading as="h1" size="xl" color="green.500">
            Payment Successful!
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Your tip has been processed correctly.
          </Text>
        </VStack>

        <Box py={2}>
          <Text fontSize="md" fontWeight="medium">
            Thanks for using <Text as="span" color="blue.500" fontWeight="bold">TipDrip</Text>!
          </Text>
          <Text fontSize="sm" color="gray.500" mt={1}>
            A receipt has been sent to your email.
          </Text>
        </Box>

        <Button
          as={NextLink}
          href="/"
          colorScheme="blue"
          size="lg"
          w="full"
          borderRadius="full"
          _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
          transition="all 0.2s"
        >
          Return Home
        </Button>
      </VStack>
    </Box>
  );
}