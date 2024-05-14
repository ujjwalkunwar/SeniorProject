import React from 'react';
import EmptyState from '@/app/components/EmptyState';
import ClientOnly from '@/app/components/ClientOnly';
import getCurrentUser from '@/app/actions/getCurrentUser';
import ListingClient from './ListingClient';
import getReservations from '@/app/actions/getReservations';
import getListingById from '@/app/actions/getLisitingById';

// Interface for the parameters of the page.
interface IParams {
  listingId?: string;
}

/**
 * Component for rendering the listing page.
 * 
 * @param {Object} props - The props for the ListingPage component.
 * @param {IParams} props.params - Parameters for the listing page.
 * @returns {JSX.Element} JSX element representing the listing page.
 */
const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ListingPage;
