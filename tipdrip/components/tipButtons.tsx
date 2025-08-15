'use client'
import React from 'react'
// Update the import path below if your hook is located elsewhere, for example:
import { useStripeCheckout } from '../hooks/useStripeCheckout';
// Or provide the correct relative path to where useStripeCheckout.ts is located

type Props = {
    tipOptions: number[],
    account_id: string,
    username: string
}

export default function TipButtons({ tipOptions, account_id, username }: Props) {
    const checkout = useStripeCheckout();
    return (
        <div className="grid grid-cols-2 gap-4 mb-6">
            {tipOptions.map((amount) => (
                <button
                    key={amount}
                    onClick={() => checkout((amount * 100), account_id, username)}
                    className="border-2 rounded-lg py-3 font-bold text-lg border-gray-200 text-blue-900"
                >
                    ${amount}
                </button>
            ))}
        </div>
    );
};