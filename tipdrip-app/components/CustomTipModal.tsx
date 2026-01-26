'use client';
import { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
} from "@chakra-ui/react";

export default function CustomTipModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (amount: number) => void;
}) {
  const [amount, setAmount] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove any non-numeric and non-dot characters
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setAmount(value);
  };

  return (
    <Flex
      position="fixed"
      inset={0}
      bg="whiteAlpha.800"
      backdropFilter="blur(4px)"
      align="center"
      justify="center"
      zIndex={50}
      animation="fadeIn 0.2s ease-out"
      sx={{
        "@keyframes fadeIn": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        }
      }}
    >
      <Box
        position="relative"
        bg={{ base: "white", _dark: "gray.900" }}
        p={8}
        borderRadius="lg"
        boxShadow="xl"
        w="320px"
      >
        <Heading size="md" mb={6}>
          Enter a custom tip
        </Heading>

        <Box mb={6} position="relative">
          <Box
            position="absolute"
            left="12px"
            top="50%"
            transform="translateY(-50%)"
            pointerEvents="none"
            fontWeight="bold"
            color="gray.500"
          >
            $
          </Box>

          <Input
            type="text"
            inputMode="decimal"
            placeholder="Tip amount"
            value={amount}
            onChange={handleChange}
            borderColor="gray.300"
            pl="8"
          />
        </Box>

        <Flex justify="flex-end" gap={3}>
          <Button
            onClick={onClose}
            bg="gray.300"
            _hover={{ bg: "gray.400" }}
          >
            Cancel
          </Button>

          <Button
            colorScheme="blue"
            onClick={() => {
              const num = parseFloat(amount);
              if (!isNaN(num) && num > 0) {
                onSubmit(num);
                onClose();
              }
            }}
          >
            Submit
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}
