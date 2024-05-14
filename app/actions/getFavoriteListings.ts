import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';

/**
 * Retrieves the favorite listings of the current user.
 * 
 * @async
 * @returns {Promise<Array<Object>>} 
 * A promise that resolves to an array of favorite listing 
 * objects or an empty array if the current user is not found.
 * @throws {Error} 
 * If an error occurs during the retrieval process.
 */

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    // Retrieving favorite listings from the database 
    // based on user's favoriteIds
    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    // Formatting the favorite listings objects
    const safeFavorites = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toISOString(),
    }))
    return safeFavorites;
  } 
  catch (error:any) {
    throw new Error(error);
  }
};