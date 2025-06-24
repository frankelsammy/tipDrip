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

    const handleSubmit = () => {
        const parsed = parseFloat(amount);
        if (!isNaN(parsed) && parsed > 0) {
            alert(`You tipped $${parsed}`);
            onSubmit(parsed);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-neutral-900/30 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-lg font-semibold mb-4">Enter a custom tip</h2>
                <input
                    type="text"
                    inputMode="decimal"
                    pattern="[0-9]*"
                    placeholder="Tip amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                />
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}
