'use client'
import React from 'react'

type Props = {
    tipOptions: number[];
}

export default function TipButtons({ tipOptions }: Props) {
    const handleTipClick = (amount: number) => {
        alert(`You tipped $${amount}`);
    }
    // or add logic to send payment, open modal, etc.
    return (
        <div className="grid grid-cols-2 gap-4 mb-6">
            {tipOptions.map((amount) => (
                <button
                    key={amount}
                    onClick={() => handleTipClick(amount)}
                    className="border-2 rounded-lg py-3 font-bold text-lg border-gray-200 text-blue-900"
                >
                    ${amount}
                </button>
            ))}
        </div>
    );
};