import getCurrentUser from '../actions/getCurrentUser';
import EmptyState from '@/app/components/EmptyState';
import ClientOnly from '@/app/components/ClientOnly';
import getReservations from '@/app/actions/getReservations';
import ReservationsClient from './ReservationsClient';

/**
 * Component for rendering the reservations page.
 * 
 * @async
 * @returns {JSX.Element} JSX element representing the reservations page.
 */
const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="UNAUTHORIZED" 
                    subtitle="Please log in" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No reservations found"
          subtitle="Looks like there is no reservations on your properties"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ReservationsPage;
