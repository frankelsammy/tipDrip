'use client';
import { useState } from 'react';
import CustomTipModal from './customTipModal';

export default function CustomTipButton() {
  const [showModal, setShowModal] = useState(false);

  const handleTipSubmit = (amount: number) => {
    console.log('Tip submitted:', amount);
    // send to backend / process as needed
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
      >
        💸 Custom Tip
      </button>
      {showModal && (
        <CustomTipModal
          onClose={() => setShowModal(false)}
          onSubmit={handleTipSubmit}
        />
      )}
    </>
  );
}
