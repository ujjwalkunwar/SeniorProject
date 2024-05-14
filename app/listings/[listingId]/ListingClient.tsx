'use client';

import Container from "@/app/components/Container";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { categories } from "@/app/components/navigationbar/Categories";
import { SafeUser, SafeListing, SafeReservation } from "@/app/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { eachDayOfInterval, differenceInCalendarDays } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import { Range } from "react-date-range";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};

// Props for the ListingClient component.
interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: SafeListing & { 
    user: SafeUser 
  };
  currentUser?: SafeUser | null;
}

/**
 * Component for managing and displaying a listing's details and reservation form.
 * 
 * @param {ListingClientProps} props - The props for the ListingClient component.
 * @returns {JSX.Element} JSX element representing the listing client.
 */
const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservations = [],
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [ ...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  // Function to handle reservation creation.
  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);

    axios
      .post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id
      })
      .then(() => {
        toast.success('Listing is reserved');
        setDateRange(initialDateRange);
        router.push('/');
      })
      .catch(() => {
        toast.error('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [
    totalPrice,
    dateRange,
    listing?.id,
    router,
    currentUser,
    loginModal,
  ]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate,
      );

      if (dayCount && listing.price) {
        setTotalPrice(listing.price * dayCount);
      }
      else{
        setTotalPrice(listing.price)
      }
    }
  }, [dateRange, listing.price]);

  const category = useMemo(() => {
    return categories.find((item) =>
      item.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
    <div className="
      mx-auto
      max-w-screen-lg ">
      <div className="
        gap-6
        flex
        flex-col ">
        <ListingHead
          title={listing.title}
          imageSrc={listing.imageSrc}
          locationValue={listing.locationValue}
          id={listing.id}
          currentUser={currentUser}
        />
        <div className="
          grid
          grid-cols-1
          md:grid-cols-7
          md:gap-10 
          mt-6">
          <ListingInfo
            user={listing.user}
            category={category}
            description={listing.description}
            roomCount={listing.roomCount}
            guestCount={listing.guestCount}
            bathroomCount={listing.bathroomCount}
            locationValue={listing.locationValue}
          />
          <div className="
            order-first 
            mb-10 
            md:order-last 
            md:col-span-3">
            <ListingReservation
              price={listing.price}
              totalPrice={totalPrice}
              onChangeDate={(value) => setDateRange(value)}
              dateRange={dateRange}
              onSubmit={onCreateReservation}
              disabled={isLoading}
              disabledDates={disabledDates}
            />
          </div>
        </div>
      </div>
    </div>
  </Container>
  );
}

export default ListingClient;