import React from 'react'
import { users } from '@/lib/users';
import TipButtons from '@/components/tipButtons';

type Props = {
    params: {
        username: string;
        displayName: string;
        tip1_amt: number;
        tip2_amt: number;
        tip3_amt: number;
        tip4_amt: number;
    };
};

export default function TipPage({ params }: Props) {
    const user = users.find(u => u.username === params.username);

    const tipOptions = [user.tip1_amt, user.tip2_amt, user.tip3_amt, user.tip4_amt];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-sm rounded-2xl shadow-lg bg-white">
                <div className="bg-blue-800 text-white rounded-t-2xl p-4 font-bold text-lg">
                    TIP DRIP
                </div>
                <div className="p-6 text-center">
                    <h1 className="text-2xl font-bold mb-1">Tip {user.displayName}</h1>
                    <p className="mb-6 text-gray-600">Select an amount to tip.</p>

                    <TipButtons tipOptions={tipOptions} />

                    <button className="w-full bg-blue-800 text-white py-3 rounded-lg font-semibold hover:bg-blue-900 transition">
                        Custom Tip
                    </button>
                </div>
            </div>
        </div>
    );
}