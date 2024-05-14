import TripsClient from './TripsClient';
import getCurrentUser from '../actions/getCurrentUser';
import getReservations from '../actions/getReservations';
import EmptyState from '../components/EmptyState';
import ClientOnly from '../components/ClientOnly';

/**
 * Component for rendering the trips page.
 * 
 * @async
 * @returns {JSX.Element} JSX element representing the trips page.
 */
const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState 
          title="Unauthorized" 
          subtitle="Please Login" />
      </ClientOnly>
    )
  }

  const reservations = await getReservations({ 
    userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No trips found"
          subtitle="Looks like you have not reserved any trips"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient
      reservations={reservations} 
      currentUser={currentUser} 
    />
    </ClientOnly>
  )
}

export default TripsPage;