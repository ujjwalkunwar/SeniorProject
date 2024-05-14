import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

/**
 * Creates a new reservation for a listing in the database.
 * 
 * @async
 * @param {Request} request - The HTTP request object containing reservation details.
 * @returns {Promise<NextResponse>} A promise that resolves to the HTTP response object.
 * @throws {Error} Throws an error if the current user is not authenticated or if required parameters are missing.
 */

export async function POST (request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { listingId, 
    startDate, 
    endDate, 
    totalPrice 
  } = body;

  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }

  // Creating a new reservation for the listing in the database
  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice
        }
      }
    }
  });

  return NextResponse.json(listingAndReservation);
}