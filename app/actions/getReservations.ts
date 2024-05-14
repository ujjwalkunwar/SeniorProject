import prisma from '@/app/libs/prismadb';

// Defining the shape of the parameters that can be passed to getReservations function
interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

/**
 * Retrieves reservations based on the provided parameters.
 * 
 * @async
 * @param {IParams} params - Parameters for filtering reservations.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of reservation objects.
 * @throws {Error} If an error occurs during the retrieval process.
 */

export default async function getReservations (
  params: IParams
) {
  try {
    const { 
      listingId, 
      userId, 
      authorId } = params;

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    // Fetching reservations from the database based on the constructed query
    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Formatting the reservations objects to ensure consistency
    const safeReservations = reservations.map(
      (reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      }
    })
    );
    return safeReservations;
  } 
  catch (error: any) {
    throw new Error(error);
  }
};