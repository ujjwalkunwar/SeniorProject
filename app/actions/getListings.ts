import prisma from '@/app/libs/prismadb';

// Defining the shape of the parameters 
// that can be passed to getListings function
export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

/**
 * Retrieves listings based on the provided parameters.
 * 
 * @async
 * @param {IListingsParams} params - Parameters for filtering listings.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of listings objects.
 * @throws {Error} If an error occurs during the retrieval process.
 */

export default async function getListings(
  params: IListingsParams
) {
  try {
    const {
      userId,
      roomCount,
      guestCount,
      bathroomCount,
      endDate,
      startDate,
      locationValue,
      category,
    } = params;
    let query: any = {};

    if(userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (roomCount) {
      query.roomCount = {gte: +roomCount}
    }

    if (bathroomCount) {
      query.bathroomCount = {gte: +bathroomCount}
    }

    if (guestCount) {
      query.guestCount = {gte: +guestCount}
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    // Adding date range filter to the query if both 
    // startDate and endDate are provided
    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: {gte: startDate},
                startDate: {lte: startDate}
              },
              {
                startDate: {lte: endDate},
                endDate: {gte: endDate}
              }
            ]
          }
        }
      }
    }

    // Fetching listings from the database based on the 
    // constructed query
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Formatting the listings objects to ensure consistency
    const safeListings = listings.map((listing) => ({
      ... listing,
      createdAt: listing.createdAt.toISOString(),
    }));
    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
};