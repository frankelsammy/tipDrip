'use client'

import {
  Box,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Link as ChakraLink,
  useColorModeValue,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

export default function NavBar({ username }: { username: string }) {
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Flex
      as="header"
      bg={bgColor}
      boxShadow="md"
      px={8}
      py={4}
      align="center"
      justify="space-between"
    >
      {/* Logo */}
      <Text fontSize="xl" fontWeight="bold">
        tipdrip
      </Text>

      {/* Navigation */}
      <Flex as="nav" gap={6} align="center">
        {/* Dropdown Menu */}
        <Menu>
          <MenuButton
            as={Button}
            variant="ghost"
            rightIcon={<ChevronDownIcon />}
            fontWeight="normal"
            _hover={{ bg: 'gray.100' }}
          >
            My Account
          </MenuButton>
          <MenuList>
            <MenuItem as={NextLink} href={`/tip/${username}`}>
              My Tip Page
            </MenuItem>
            <MenuItem as={NextLink} href="/product2">
              Product 2
            </MenuItem>
          </MenuList>
        </Menu>

        {/* Regular Link */}
        <ChakraLink
          as={NextLink}
          href="/about"
          px={4}
          py={2}
          borderRadius="md"
          _hover={{ bg: 'gray.100', textDecoration: 'none' }}
        >
          About Us
        </ChakraLink>
      </Flex>
    </Flex>
  );
}