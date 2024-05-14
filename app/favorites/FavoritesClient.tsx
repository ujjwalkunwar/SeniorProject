'use client';

import Container from '../components/Container';
import Heading from '../components/Heading';
import ListingCard from '../components/listings/ListingCard';
import { SafeListing, SafeUser } from '../types';

// Defining the props required for the FavoritesClient component.
interface FavoritesClientProps {
  listings: SafeListing[];
  currentUser: SafeUser | null;
}

/**
 * FavoritesClient component displays a list of favorite listings.
 *
 * @param {FavoritesClientProps} props - Props for the FavoritesClient component.
 * @returns {JSX.Element} FavoritesClient element containing the list of favorite listings.
 */
export const FavoritesClient: React.FC<FavoritesClientProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <Container>
      <Heading
        title="Favorites"
        subtitle="Places you have favorited"
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
            currentUser={currentUser}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
};