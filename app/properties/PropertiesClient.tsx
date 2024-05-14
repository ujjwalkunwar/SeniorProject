'use client';

import axios from 'axios';
import { SafeListing, SafeUser } from '../types';
import Container from '../components/Container';
import Heading from '../components/Heading';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import ListingCard from '../components/listings/ListingCard';

// PropertiesClientProps interface.
interface PropertiesClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

/**
 * Component for rendering a list of properties.
 * 
 * @param {PropertiesClientProps} props - The props for the PropertiesClient component.
 * @returns {JSX.Element} JSX element representing the properties client.
 */
const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  /**
   * Function to handle cancellation of a listing.
   * 
   * @param {string} id - The ID of the listing to cancel.
   */
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success('The listing is deleted');
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
        title="Properties"
        subtitle="List of your properties"
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
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              data={listing}
              actionId={listing.id}
              onAction={onCancel}
              disabled={deletingId === listing.id}
              actionLabel="Delete Property"
              currentUser={currentUser}
            />
          ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;