'use client';

import { Dispatch, FC, SetStateAction } from 'react';
import DatePicker, { DatePickerProps } from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useRouter } from 'next/navigation';

type Props = {
  price: number;
  discount: number;
  specialNote: string;
  checkinDate: Date | null;
  setCheckinDate: Dispatch<SetStateAction<Date | null>>;
  checkoutDate: Date | null;
  setCheckoutDate: Dispatch<SetStateAction<Date | null>>;
  adults: number;
  noOfChildren: number;
  setAdults: Dispatch<SetStateAction<number>>;
  setNoOfChildren: Dispatch<SetStateAction<number>>;
  isBooked: boolean;
  handleBookNowClick: () => void;
  
};

const BookRoomCta: FC<Props> = ({
  price,
  discount,
  specialNote,
  checkinDate,
  setCheckinDate,
  checkoutDate,
  setCheckoutDate,
  adults,
  setAdults,
  noOfChildren,
  setNoOfChildren,
  isBooked,
  
  
}) => {
  const router = useRouter();

  const discountPrice = price - (price / 100) * discount;

  const calcNoOfDays = () => {
    if (!checkinDate || !checkoutDate) return 0;
    const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
    const noOfDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
    return noOfDays;
  };

  const handleCheckinChange: DatePickerProps['onChange'] = (value) => {
    if (value instanceof Date || value === null) {
      setCheckinDate(value);
    } else if (Array.isArray(value) && value[0] instanceof Date) {
      setCheckinDate(value[0]);
    } else {
      setCheckinDate(null);
    }
  };

  

  const handleCheckoutChange: DatePickerProps['onChange'] = (value) => {
    if (value instanceof Date || value === null) {
      setCheckoutDate(value);
    } else if (Array.isArray(value) && value[0] instanceof Date) {
      setCheckoutDate(value[0]);
    } else {
      setCheckoutDate(null);
    }
  };

  const handleBookNowClick = async () => {
    if (!checkinDate || !checkoutDate || adults < 1) {
      alert("Please select valid check-in/check-out dates and specify at least one adult.");
      return;
    }
  };

  

  

  return (
    <div className="px-7 py-6">
      <h3>
        <span className={`${discount ? 'text-gray-400' : ''} font-bold text-xl`}>
          $ {price}
        </span>
        {discount ? (
          <span className="font-bold text-xl">
            {' '}
            | discount {discount}%. Now{' '}
            <span className="text-tertiary-dark">$ {discountPrice.toFixed(2)}</span>
          </span>
        ) : (
          ''
        )}
      </h3>
      <div className="w-full border-b-2 border-b-secondary my-2" />

      <h4 className="my-8">{specialNote}</h4>
      <div className="flex">
        <div className="w-1/2 pr-2">
          <label
            htmlFor="check-in-date"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Check-in date
          </label>
          <DatePicker
            value={checkinDate}
            onChange={handleCheckinChange}
            minDate={new Date()}
            id="check-in-date"
            className="rounded-lg p-2.5 focus:ring-primary focus:border-primary"
          />
        </div>
        <div className="w-1/2 pl-2">
          <label
            htmlFor="check-out-date"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Check-out date
          </label>
          <DatePicker
            value={checkoutDate}
            onChange={handleCheckoutChange}
            minDate={checkinDate || new Date()} /* Checkout date must be after check-in */
            id="check-out-date"
            className="rounded-lg p-2.5 focus:ring-primary focus:border-primary"
          />
        </div>
      </div>
      <div className="flex mt-4">
        <div className="w-1/2 pr-2">
          <label
            htmlFor="adults"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Adults
          </label>
          <input
            type="number"
            id="adults"
            value={adults}
            onChange={(e) => setAdults(+e.target.value)}
            min={1}
            max={5}
            className="w-full border border-gray-300 rounded-lg p-2.5"
          />
        </div>
        <div className="w-1/2 pl-2">
          <label
            htmlFor="children"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Children
          </label>
          <input
            type="number"
            id="children"
            value={noOfChildren}
            onChange={(e) => setNoOfChildren(+e.target.value)}
            min={0}
            max={3}
            className="w-full border border-gray-300 rounded-lg p-2.5"
          />
        </div>
      </div>

      {calcNoOfDays() > 0 ? (
        <p className="mt-3">Total Price: $ {calcNoOfDays() * discountPrice}</p>
      ) : (
        <></>
      )}

      <button
        disabled={isBooked}
        onClick={handleBookNowClick}
        className="btn-primary w-full mt-6 disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        {isBooked ? 'Booked' : 'Book Now'}
      </button>
    </div>
  );
};

export default BookRoomCta;
