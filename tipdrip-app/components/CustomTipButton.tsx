'use client';
import { useState } from 'react';
import CustomTipModal from './CustomTipModal';
import { useStripeCheckout } from '@/hooks/useStripeCheckout';

import { Button } from "@chakra-ui/react"

type Props = {
  account_id: string,
  username: string
};

export default function CustomTipButton({ account_id, username }: Props) {
  const [showModal, setShowModal] = useState(false);
  const checkout = useStripeCheckout();

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

  {showModal && (
    <CustomTipModal
      onClose={() => setShowModal(false)}
      onSubmit={(amount) =>
        checkout(amount * 100, account_id, username)
      }
    />
  )}
</>
  );
}
