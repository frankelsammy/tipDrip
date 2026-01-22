'use client';
import { useState } from 'react';

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
        <div className="fixed inset-0 bg-neutral-900/30 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-lg font-semibold mb-4">Enter a custom tip</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        inputMode="decimal"
                        pattern="[0-9]*"
                        placeholder="Tip amount"
                        value={amount ? `$${amount}` : ''}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        onClick={() => {
                            const num = parseFloat(amount);
                            if (!isNaN(num) && num > 0) {
                                onSubmit(num);
                                onClose();
                            }
                        }}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}
