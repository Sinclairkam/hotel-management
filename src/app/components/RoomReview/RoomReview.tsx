import axios from 'axios';
import { FC } from 'react';
import useSWR from 'swr';

import { Review } from '@/models/review';
import Rating from '../Rating/Rating';

const RoomReview: FC<{ roomId: string }> = ({ roomId }) => {
  // Define the fetcher function for SWR
  const fetchRoomReviews = async (url: string) => {
    const { data } = await axios.get<Review[]>(url);
    return data;
  };

  // Use SWR with a dynamic key that includes the roomId
  const { data: roomReviews, error, isLoading } = useSWR(
    `/api/room-reviews/${roomId}`,
    fetchRoomReviews
  );

  // Handle loading, error, and empty states
  if (isLoading) return <p>Loading reviews...</p>;
  if (error) return <p>Failed to load reviews.</p>;
  if (!roomReviews || roomReviews.length === 0)
    return <p>No reviews available for this room.</p>;

  return (
    <>
      {roomReviews.map((review) => (
        <div
          className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg"
          key={review._id}
        >
          <div className="font-semibold mb-2 flex">
            <p>{review.user.name}</p>
            <div className="ml-4 flex items-center text-tertiary-light text-lg">
              <Rating rating={review.userRating} />
            </div>
          </div>
          <p>{review.text}</p>
        </div>
      ))}
    </>
  );
};

export default RoomReview;
