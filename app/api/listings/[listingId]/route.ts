import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

interface IParams {
  listingId?: string;
}

/**
 * Handles the DELETE request to delete a listing.
 * 
 * @async
 * @param {Request} request - The incoming request object.
 * @param {IParams} params - Parameters for the request.
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object.
 * @throws {Error} If an error occurs during the listing process.
 */

export async function DELETE (
  request: Request,
  { params }: { params: IParams },
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;
  if (!listingId || typeof listingId !== 'string') {
    throw new Error('INVALID ID');
  }

  // Deleting the listing if requested by the user
  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    }
  });

  return NextResponse.json(listing);
};