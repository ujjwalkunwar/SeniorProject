import prisma from '@/app/libs/prismadb';

interface IParams {
  listingId?: string;
}

/**
 * Retrieves a listing by its unique identifier.
 * 
 * @async
 * @param {IParams} params - Parameters for the listing retrieval.
 * @param {string} params.listingId - The unique identifier of 
 * the listing.
 * @returns {Promise<Object | null>} A promise that resolves to the 
 * listing object if found, or null if the listing does not exist.
 * @throws {Error} If an error occurs during the retrieval process.
 */

export default async function getListingById (
  params: IParams) {
  try {
    const {listingId} = params;

    // Finding the listing in the database based on lisitngId
    const listing = await prisma.listing.findUnique({
      where: { 
        id: listingId },
      include: { 
        user: true }
    });

    if (!listing) {return null;}

    // Formatting the listing and user objects
    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: 
          listing.user.createdAt.toISOString(),
        updatedAt: 
          listing.user.updatedAt.toISOString(),
        emailVerified: 
          listing.user.emailVerified?.toISOString() || null,
      },
    };
  } 
  catch (error: any) {throw new Error(error);}
};