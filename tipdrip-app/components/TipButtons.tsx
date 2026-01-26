'use client'
import React from 'react'
import { useStripeCheckout } from '../hooks/useStripeCheckout';
import { SimpleGrid, Button } from "@chakra-ui/react"

type Props = {
    tipOptions: number[],
    account_id: string,
    username: string
}

export default function TipButtons({ tipOptions, account_id, username }: Props) {
    const checkout = useStripeCheckout();
    return (
        <SimpleGrid columns={2} spacing={4} mb={6}>
            {tipOptions.map((amount) => (
                <Button
                    key={amount}
                    onClick={() => checkout(amount * 100, account_id, username)}
                    variant="outline"
                    borderWidth="2px"
                    borderColor="gray.200"
                    borderRadius="lg"
                    py={6}
                    fontWeight="bold"
                    fontSize="lg"
                    color="blue.600"
                >
                    ${amount}
                </Button>
            ))}
        </SimpleGrid>
    );
};