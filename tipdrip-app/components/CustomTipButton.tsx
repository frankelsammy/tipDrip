'use client';
import React from 'react';
import { useState } from 'react';
import CustomTipModal from './CustomTipModal';
import { useStripeCheckout } from '@/hooks/useStripeCheckout';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from '@chakra-ui/react';
import { useRef } from 'react'; // Required for focus managemen
import { Button, useDisclosure } from "@chakra-ui/react"

type Props = {
  account_id: string,
  username: string
};

export default function CustomTipButton({ account_id, username }: Props) {
  const [showModal, setShowModal] = useState(false);
  const checkout = useStripeCheckout();

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement>(null);


  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        borderRadius="full"
        variant="outline"
        borderColor="blackAlpha.200"
        fontWeight="medium"
        fontSize={{ base: "sm", sm: "md" }}
        h={{ base: 10, sm: 12 }}
        px={{ base: 4, sm: 5 }}
        _hover={{
          bg: "gray.100",
          _dark: { bg: "gray.800" },
        }}
      >
        💸 Custom Tip
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Invalid Amount
            </AlertDialogHeader>

            <AlertDialogBody>
              Tips must be greater than $0.50 
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Return
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {showModal && (
        <CustomTipModal
          onClose={() => setShowModal(false)}
          onSubmit={(amount) => {
            if (amount < 0.50) {
              onOpen();
            } else {
              checkout(amount * 100, account_id, username);
            }
          }}
        />
      )}
    </>
  );
}
