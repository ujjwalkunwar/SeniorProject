'use client';

import Image from 'next/image';
import { format } from 'date-fns';
import useCountries from "@/app/hooks/useCountries";
import { SafeUser, SafeListing, SafeReservation } from "@/app/types";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { HeartButton } from '../HeartButton';
import Button from '../Button';

/**
 * Props interface for the ListingCard component.
 */

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

/**
 * A component representing a card for a listing.
 * 
 * @param {Object} props - The props object containing component properties.
 * @param {SafeListing} props.data - The listing data.
 * @param {SafeReservation} [props.reservation] - The reservation data (optional).
 * @param {(id: string) => void} [props.onAction] - A function to handle an action (optional).
 * @param {boolean} [props.disabled] - Whether the component is disabled.
 * @param {string} [props.actionLabel] - The label for the action button (optional).
 * @param {string} [props.actionId] - The id for the action (optional).
 * @param {SafeUser | null} [props.currentUser] - The current user data (optional).
 * @returns {React.ReactNode} A React component representing a card for a listing.
 */

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId= "",
  currentUser
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);

  /**
   * Callback function to handle cancellation.
   * 
   * @param {React.MouseEvent<HTMLButtonElement>} e - The event object.
   */
  
  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) {return;}
      onAction?.(actionId);
    },
    [onAction, actionId, disabled],
  );

  const price = useMemo(() => {
    if (reservation) {return reservation.totalPrice;}

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {return null;}

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`
  }, [reservation]);

  const bookingEmail = useMemo(() => {
    if(reservation){
      if (currentUser?.id == reservation?.userId){
        return currentUser.email;
      }
      else{
        return "ujkunwar@gmail.com"
      }
    }
  },[currentUser, reservation]);

  return (
    <div
      className="
        col-span-1 
        cursor-pointer 
        group"
      onClick={() => router.push(`/listings/${data.id}`)}
    >
      <div className="
        flex
        flex-col 
        gap-2 
        w-full">
        <div className="
          aspect-square 
          w-full 
          relative 
          overflow-hidden 
          rounded-xl">
          <Image
            alt="Listing"
            src={data.imageSrc}
            fill
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-105
              transition"
          />
          <div className="
            absolute
            top-3 
            right-3">
            <HeartButton listingId={data.id} 
              currentUser={currentUser} />
          </div>
        </div>
              <div className="
                text-lg 
                font-bold ">
                { data.title}
              </div>
              <div className="
                text-sm 
                font-semibold">
                {location?.region}, {location?.label}
              </div>
              <div className="
                font-light 
                text-neutral-400">
                {reservationDate || data.category}
              </div>
              <div className="
                font-light 
                text-neutral-400">
                {bookingEmail}
              </div>
              <div className="
                gap-1
                flex 
                flex-row 
                items-center">
                <div className="
                  font-semibold">
                  $ {price}
                </div>
                {!reservation && (
                  <div className="
                    font-light">
                    / night
                  </div>
                )}
              </div>
                {onAction && actionLabel && (
                  <Button
                    small
                    label={actionLabel}
                    disabled={disabled}
                    onClick={handleCancel}
                />
              )}
      </div>
    </div>
  );
}

export default ListingCard;