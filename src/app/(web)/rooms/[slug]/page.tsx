'use client';

import { useState, useMemo, useEffect } from 'react';

import useSWR from 'swr';
import axios from 'axios';
import { MdOutlineCleaningServices } from 'react-icons/md';
import { LiaFireExtinguisherSolid } from 'react-icons/lia';
import { AiOutlineMedicineBox } from 'react-icons/ai';
import { GiSmokeBomb } from 'react-icons/gi';
import { getRoom } from '@/libs/apis';
import LoadingSpinner from '../../loading';
import HotelPhotoGallery from '@/app/components/HotelPhotoGallery/HotelPhotoGallery';
import BookRoomCta from '@/app/components/BookRoomCta/BookRoomCta';
import toast from 'react-hot-toast';
import RoomReview from '@/app/components/RoomReview/RoomReview';
import { getStripe } from '@/libs/stripe';
// import { useRouter } from 'next/navigation';

const RoomDetails = ({ params }: { params: { slug: string } }) => {
  const [slug, setSlug] = useState<string | null>(null);

  // Resolve `params` using React hooks
  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };
    resolveParams();
  }, [params]);

  const [checkinDate, setCheckinDate] = useState<Date | null>(null);
  const [checkoutDate, setCheckoutDate] = useState<Date | null>(null);
  const [adults, setAdults] = useState(1);
  const [noOfChildren, setNoOfChildren] = useState(0);

  const fetchRoom = async () => {
    if (slug) {
      return await getRoom(slug);
    }
    return null;
  };

  const { data: room, error, isLoading } = useSWR(slug ? `/api/room/${slug}` : null, fetchRoom);



  const numberOfDays = useMemo(() => {
    if (!checkinDate || !checkoutDate) return 1;
    const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
    return Math.max(Math.ceil(timeDiff / (24 * 60 * 60 * 1000)), 1);
  }, [checkinDate, checkoutDate]);

  const handleBookNowClick = async () => {
    // const router = useRouter();
    if (!checkinDate || !checkoutDate) {
      toast.error('Please provide check-in / checkout date');
      return;
    }
    if (checkinDate > checkoutDate) {
      toast.error('Please choose a valid check-in period');
      return;
    }

    try {
      if (!room) {
        toast.error('Room details are not available');
        return;
      }

      const hotelRoomSlug = room.slug.current;
      const cont = true
  

      if (cont) {
        console.log('eita ma sonk')
        window.location.href = '/payment';
        // router.push('/payment');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred during booking.');
    }
  };

  if (error) return <p>Error: Unable to fetch room details.</p>;
  if (isLoading) return <LoadingSpinner />;
  if (!room) return <p>Room details not found.</p>;

  return (
    <div>
      <HotelPhotoGallery photos={room.images} />
      <div className="container mx-auto mt-20">
        <div className="md:grid md:grid-cols-12 gap-10 px-3">
          {/* Left Column */}
          <div className="md:col-span-8 md:w-full">
            <h2 className="font-bold text-left text-lg md:text-2xl">
              {room.name} ({room.dimension})
            </h2>
            <div className="flex my-11">
              {room.offeredAmenities?.map((amenity) => (
                <div
                  key={amenity._key}
                  className="md:w-44 w-fit text-center px-2 md:px-0 h-20 md:h-40 mr-3 bg-[#eff0f2] dark:bg-gray-800 rounded-lg grid place-content-center"
                >
                  <i className={`fa-solid ${amenity.icon} md:text-2xl`}></i>
                  <p className="text-xs md:text-base pt-3">{amenity.amenity}</p>
                </div>
              ))}
            </div>
            <div className="mb-11">
              <h2 className="font-bold text-3xl mb-2">Description</h2>
              <p>{room.description}</p>
            </div>
            <div className="mb-11">
              <h2 className="font-bold text-3xl mb-2">Safety And Hygiene</h2>
              <div className="grid grid-cols-2">
                <div className="flex items-center my-1 md:my-0">
                  <MdOutlineCleaningServices />
                  <p className="ml-2 md:text-base text-xs">Daily Cleaning</p>
                </div>
                <div className="flex items-center my-1 md:my-0">
                  <LiaFireExtinguisherSolid />
                  <p className="ml-2 md:text-base text-xs">Fire Extinguishers</p>
                </div>
                <div className="flex items-center my-1 md:my-0">
                  <AiOutlineMedicineBox />
                  <p className="ml-2 md:text-base text-xs">
                    Disinfections and Sterilizations
                  </p>
                </div>
                <div className="flex items-center my-1 md:my-0">
                  <GiSmokeBomb />
                  <p className="ml-2 md:text-base text-xs">Smoke Detectors</p>
                </div>
              </div>
            </div>
            <div className="shadow dark:shadow-white rounded-lg p-6">
              <div className="items-center mb-4">
                <p className="md:text-lg font-semibold">Customer Reviews</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RoomReview roomId={room._id} />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-4 md:w-full">
            <div className="rounded-xl shadow-lg dark:shadow-white sticky top-10 h-fit overflow-auto">
              <BookRoomCta
                discount={room.discount}
                price={room.price}
                specialNote={room.specialNote}
                checkinDate={checkinDate}
                setCheckinDate={setCheckinDate}
                checkoutDate={checkoutDate}
                setCheckoutDate={setCheckoutDate}
                adults={adults}
                noOfChildren={noOfChildren}
                setAdults={setAdults}
                setNoOfChildren={setNoOfChildren}
                isBooked={room.isBooked}
                handleBookNowClick={handleBookNowClick}
                
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
