'use client';

import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import Container from '../components/Container';
import Heading from '../components/Heading';
import ListingCard from '../components/listings/ListingCard';
import { SafeReservation, SafeUser } from '../types';

// ReservationsClientProps interface.
interface ReservationsClientProps {
  reservations: SafeReservation[];
  currentUser: SafeUser | null;
}

/**
 * Component for rendering a list of reservations.
 * 
 * @param {ReservationsClientProps} props - The props for the ReservationsClient component.
 * @returns {JSX.Element} JSX element representing the reservations client.
 */
const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  /**
   * Function to handle cancellation of a reservation.
   * 
   * @param {string} id - The ID of the reservation to cancel.
   */
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Reservation canceled');
          router.refresh();
        })
        .catch((error) =>{
          toast.error(error?.response?.data?.error || 'Something went wrong');
    })
        .finally(() => {
          setDeletingId('');
        })
    },
    [router]);

  return (
    <Container>
      <Heading title="Reservations" 
        subtitle="Bookings on your properties" />
      <div className="
        grid 
        grid-cols-1
        mt-10  
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-5 
        2xl:grid-cols-6 
        gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            currentUser={currentUser}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel the reservation"
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;