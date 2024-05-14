import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';

interface IParams {
  reservationId?: string;
}

/**
 * Deletes a reservation from the database.
 * 
 * @async
 * @param {Request} request - The HTTP request object.
 * @param {Object} options - The options object.
 * @param {string} [options.params.reservationId] - The ID of the reservation to delete.
 * @returns {Promise<NextResponse>} A promise that resolves to the HTTP response object.
 * @throws {Error} Throws an error if the reservation ID is invalid or if the current user is not authenticated.
 */

export async function DELETE (
  request: Request,
  { params }: { 
    params: IParams 
  }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params; 

  if (!reservationId || typeof reservationId !== 'string') {
    throw new Error('INVALID ID');
  }

  // Deleting the reservation from the database
  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ 
        userId: currentUser.id 
        }, 
        { listing: { 
          userId: currentUser.id 
        } }
      ]
    }
  });

  return NextResponse.json(reservation);
}