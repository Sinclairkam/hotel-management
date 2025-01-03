// src/app/api/bookRoom/route.ts

import { createBooking, updateHotelRoom } from '@/libs/apis';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const {
    adults,
    checkinDate,
    checkoutDate,
    children,
    hotelRoom,
    numberOfDays,
    user,
    discount,
    totalPrice,
  } = await req.json();

  try {
    // Step 1: Create the booking
    await createBooking({
      adults,
      checkinDate,
      checkoutDate,
      children,
      hotelRoom,
      numberOfDays,
      totalPrice,
      discount,
      user,
    });

    // Step 2: Update the room status to "booked"
    await updateHotelRoom(hotelRoom);

    // Return a successful response
    return NextResponse.json({ message: 'Booking successful' }, { status: 200 });
  } catch (error) {
    console.error('Error during booking process:', error);
    return NextResponse.json({ error: 'An error occurred during the booking process' }, { status: 500 });
  }
}
