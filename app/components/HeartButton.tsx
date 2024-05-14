'use client';
import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { SafeUser } from '@/app/types';
import useFavorite from '../hooks/useFavorite';

// Interface defining the props required for the HeartButton component.
interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

/**
 * HeartButton component allows users to toggle favorite status for a listing.
 * 
 * @param {HeartButtonProps} props - Props for the HeartButton component.
 * @returns {JSX.Element} HeartButton element containing the heart icon.
 */
export const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  // Custom hook to handle favorite functionality
  const { toggleFavorite, hasFavorited } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <div
      onClick={toggleFavorite}
      className="
        relative 
        transition 
        cursor-pointer
        hover:opacity-80 
        "
    >
      <AiOutlineHeart
        size={27}
        className="
          absolute
          fill-white 
          -top-[2px] 
          -right-[2px]"
      />
      <AiFillHeart
        size={23}
        className={hasFavorited ? 'fill-red-500' : 'fill-neutral-500/70'}
      />
    </div>
  );
};