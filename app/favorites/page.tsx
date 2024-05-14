import getCurrentUser from '../actions/getCurrentUser';
import getFavoriteListings from '../actions/getFavoriteListings';
import ClientOnly from '../components/ClientOnly';
import EmptyState from '../components/EmptyState';
import { FavoritesClient } from './FavoritesClient';

/**
 * ListingPage component handles rendering the page for displaying favorite listings.
 * 
 * @returns {Promise<JSX.Element>} JSX.Element representing the ListingPage.
 */
const ListingPage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="Favorites not found"
          subtitle="You do not have any favorite listings yet"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient listings={listings} 
                        currentUser={currentUser} />
    </ClientOnly>
  );
};

export default ListingPage;