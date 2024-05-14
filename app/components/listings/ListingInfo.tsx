'use client';

import { IconType } from 'react-icons';
import { SafeUser } from '@/app/types';
import useCountries from '@/app/hooks/useCountries';
import Avatar from '../Avatar';
import ListingCategory from './ListingCategory';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../Map'), { 
  ssr: false 
});

/**
 * Props interface for the ListingInfo component.
 */
interface ListingInfoProps {
  user: SafeUser;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  category: { label: string; 
    icon: IconType; 
    description: string 
  } | undefined;
  description: string;
  locationValue: string;
}

/**
 * A component representing the information section of a listing.
 * 
 * @param {Object} props - The props object containing component properties.
 * @param {SafeUser} props.user - The user hosting the listing.
 * @param {number} props.roomCount - The number of rooms in the listing.
 * @param {number} props.guestCount - The number of guests the listing can accommodate.
 * @param {number} props.bathroomCount - The number of bathrooms in the listing.
 * @param {{label: string, icon: IconType, description: string} | undefined} [props.category] - The category of the listing (optional).
 * @param {string} props.description - The description of the listing.
 * @param {string} props.locationValue - The location value of the listing.
 * @returns {React.ReactNode} A React component representing the information section of a listing.
 */
const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  roomCount,
  guestCount,
  bathroomCount,
  category,
  description,
  locationValue
}) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="
      flex 
      flex-col
      col-span-4
      gap-8">
      <div className="
        flex
        flex-col 
        gap-2">
        <div className="
          flex 
          flex-rowtext-xl 
          font-semibold  
          items-center 
          gap-2">
          <div>
            Hosted by {user?.name}
          </div>
          <Avatar src={user?.image} />
        </div>
        <div>
          Contact here for inquiry: <a href={`mailto:${user?.email}`} style={{ color: 'blue', textDecoration: 'underline' }}>{user?.email}</a>
        </div>
        <div className="
          flex 
          flex-row
          font-light
          gap-4
          items-center 
          text-neutral-450">
          <div>
            {guestCount} guests
          </div>
          <div>
            {roomCount} rooms
          </div>
          <div>
            {bathroomCount} bathrooms
          </div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="
        text-lg 
        font-light 
        text-neutral-500">
        {description}
      </div>
      <hr />
      <Map center={
        coordinates
        } />
    </div>
  );
};

export default ListingInfo;