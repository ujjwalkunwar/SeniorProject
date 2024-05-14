import PropertiesClient from './PropertiesClient';
import getCurrentUser from '../actions/getCurrentUser';
import EmptyState from '../components/EmptyState';
import ClientOnly from '../components/ClientOnly';
import getListings from '../actions/getListings';

/**
 * Component for rendering the properties page.
 * 
 * @async
 * @returns {JSX.Element} JSX element representing the properties page.
 */
const PropertiesPage = async () => {
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

  const listings = await getListings({ 
    userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No properties found"
          subtitle="Looks like you have no properties"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesClient
      listings={listings} 
      currentUser={currentUser} 
    />
    </ClientOnly>
  )
}

export default PropertiesPage;