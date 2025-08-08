"use client";
import React from 'react';

const page = () => {
  const handleConnect = async () => {
    try {
      const res = await fetch('/api/create-account/', {
        method: 'POST',
      });
      const data = await res.json();
      if (data.url && typeof data.url === 'string') {
        window.location.href = data.url;
      } else {
        alert('Error: Invalid URL received from server.');
        console.log('API response:', data);
      }
    } catch (error) {
      alert('Error connecting to Stripe.');
      console.error(error);
    }
  };

  return (
    <div>
      <button
        onClick={handleConnect}
        className="border-2 rounded-lg py-3 px-6 font-bold text-lg border-gray-200 text-blue-900"
      >
        Connect with Stripe
      </button>
    </div>
  );
};

export default page;