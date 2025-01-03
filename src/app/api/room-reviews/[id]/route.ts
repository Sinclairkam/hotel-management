import { getRoomReviews } from '@/libs/apis';
import { NextResponse } from 'next/server';

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params; // Await the `params` promise
    const roomReviews = await getRoomReviews(id);

    return NextResponse.json(roomReviews, {
      status: 200,
      statusText: 'Successful',
    });
  } catch (error) {
    console.error('Getting Review Failed', error);
    return NextResponse.json({ error: 'Unable to fetch' }, { status: 400 });
  }
}
