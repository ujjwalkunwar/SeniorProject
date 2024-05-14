'use client';

import Button from '@/app/components/Button';
import { Range } from 'react-date-range';
import Calendar from '../inputs/Calendar';

/**
 * Props interface for the ListingReservation component.
 */
interface ListingReservationProps {
  price: number;
  onSubmit: () => void;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  dateRange: Range;
  disabled?: boolean;
  disabledDates: Date[];
}

/**
 * A component representing reservation details for a listing.
 * 
 * @param {Object} props - The props object containing component properties.
 * @param {number} props.price - The price per night.
 * @param {() => void} props.onSubmit - A function to handle form submission.
 * @param {number} props.totalPrice - The total price.
 * @param {(value: Range) => void} props.onChangeDate - A function to handle date range changes.
 * @param {Range} props.dateRange - The selected date range.
 * @param {boolean} [props.disabled] - Whether the component is disabled.
 * @param {Date[]} props.disabledDates - An array of disabled dates.
 * @returns {React.ReactNode} A React component representing reservation details for a listing.
 */
const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  onSubmit,
  totalPrice,
  onChangeDate,
  dateRange,
  disabled,
  disabledDates,
}) => {
  return (
    <div className="
      border-[1px] 
      border-neutral-190
      bg-white 
      rounded-xl 
      overflow-hidden">
      <div className="
        flex 
        flex-row 
        items-center 
        gap-1 
        p-4">
        <div className="
          text-2xl 
          font-semibold">
          $ {price}
        </div>
        <div className="
          font-light 
          text-neutral-500">
          night
        </div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button 
          onClick={onSubmit}
          label="Reserve"
          disabled={disabled}
        />
      </div>
      <div className="
        flex 
        flex-row
        p-4 
        items-center 
        justify-between 
        font-semibold 
        text-lg">
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;