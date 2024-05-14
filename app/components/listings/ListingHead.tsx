'use client';
import Heading from '@/app/components/Heading';
import Image from 'next/image';
import React from 'react';
import useCountries from '@/app/hooks/useCountries';
import { HeartButton } from '@/app/components/HeartButton';
import { SafeUser } from '@/app/types';

/**
 * Props interface for the ListingHead component.
 */
interface ListingHeadProps {
  title: string;
  id: string;
  imageSrc: string;
  locationValue: string;
  currentUser?: SafeUser | null;
}

/**
 * A component representing the header of a listing.
 * 
 * @param {Object} props - The props object containing component properties.
 * @param {string} props.title - The title of the listing.
 * @param {string} props.id - The ID of the listing.
 * @param {string} props.imageSrc - The URL of the listing image.
 * @param {string} props.locationValue - The location value of the listing.
 * @param {SafeUser | null} [props.currentUser] - The current user data (optional).
 * @returns {React.ReactNode} A React component representing the header of a listing.
 */

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  id,
  imageSrc,
  locationValue,
  currentUser
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="
        w-full 
        overflow-hidden 
        rounded-xl 
        h-[60vh] 
        relative"
      >
        <Image
          fill
          src={imageSrc}
          alt="Image"
          className="
            object-cover 
            w-full"
        />
        <div className="
          top-5 
          right-5 
          absolute">
          <HeartButton listingId={id} 
            currentUser={currentUser} 
          />
        </div>
      </div>
    </>
  );
};

export default ListingHead;