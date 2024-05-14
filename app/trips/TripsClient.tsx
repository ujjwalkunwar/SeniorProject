'use client';

import axios from 'axios';
import { SafeReservation, SafeUser } from '../types';
import Container from '../components/Container';
import Heading from '../components/Heading';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import ListingCard from '../components/listings/ListingCard';

// TripsClientProps interface.
interface TripsClientProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}

/**
 * Component for rendering a list of trips.
 * 
 * @param {TripsClientProps} props - The props for the TripsClient component.
 * @returns {JSX.Element} JSX element representing the trips client.
 */
const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser
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
          toast.success('Reservation is canceled');
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error || 'Something went wrong');
        })
        .finally(() => {
          setDeletingId('');
      });
    }, [router]);

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you have been and where you are going"
      />
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
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deletingId === reservation.id}
              actionLabel="Cancel reservation"
              currentUser={currentUser}
            />
          ))}
      </div>
    </Container>
  );
};

export default TripsClient;