'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Payment() {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // Call API to finalize booking
      const response = await fetch('/api/bookings/finalize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId: 'your_booking_id' }), // Replace with actual data
      });

      if (!response.ok) throw new Error('Payment failed');

      // Redirect to confirmation page on success
      router.push('/confirmation');
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="font-heading text-red-800 mb-10">
        This is the payment page!
      </h2>
      <button
        onClick={handlePayment}
        disabled={isProcessing}
        className={`btn-primary ${isProcessing ? 'cursor-wait bg-gray-500' : ''}`}
      >
        {isProcessing ? 'Processing...' : 'Proceed with Payment'}
      </button>
    </div>
  );
}
