import { useMemo, useCallback } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import useLoginModal from '@/app/hooks/useLoginModal';
import { SafeUser } from '@/app/types';

// Interface for the useFavorite hook.
interface IUseFavorite {
  currentUser?: SafeUser | null;
  listingId: string;
}

/**
 * Custom hook to handle favoriting and unfavoriting listings.
 * 
 * @param {IUseFavorite} params - Parameters for the hook.
 * @returns {{
*    hasFavorited,
*    toggleFavorite
* }} The methods to check if the listing is favorited and to toggle its favorite status.
*/
export const useFavorite = ({ 
  listingId, 
  currentUser 
}: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  // Callback function to toggle favorite status of the listing
  const toggleFavorite = useCallback(async (
    e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {return loginModal.onOpen();}

      try {
        let request;
        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`)
        }
        else{
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();
        router.refresh();
        toast.success('Done');
      } 
      catch (error) {
        toast.error('Something went wrong');
      }
    },
    [currentUser, 
      loginModal, 
      hasFavorited, 
      listingId, 
      router],
  );

  return { hasFavorited, 
    toggleFavorite };
};

export default useFavorite;