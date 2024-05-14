
import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

interface IParams {
  listingId?: string;
}

/**
 * Handles the POST request to add a listing to the user's favorites.
 * 
 * @async
 * @param {Request} request - The incoming request object.
 * @param {IParams} params - Parameters for the request.
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object.
 * @throws {Error} If an error occurs during the process of favoriting.
 */

export async function POST (
  request: Request,
  { params }: { params: IParams },
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {return NextResponse.error();}
  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('INVALID ID');
  }

  // Updating favoriteIds array in the user's data
  let favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds.push(listingId);
  const user = await prisma.user.update({
    where: {id: currentUser.id,
    },
    data: {favoriteIds,
    },
  });

  return NextResponse.json(user);
};

/**
 * Handles the DELETE request to remove a listing from the user's favorites.
 * 
 * @async
 * @param {Request} request - The incoming request object.
 * @param {IParams} params - Parameters for the request.
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object.
 * @throws {Error} If an error occurs during the process.
 */

export async function DELETE (
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('INVALID ID');
  }

  // Removing listingId from favoriteIds array in the user's data
  let favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds = favoriteIds.filter((id) => id !== listingId);
  const user = await prisma.user.update({
    where: {id: currentUser.id,
      },
    data: {favoriteIds,
      },
  });

  return NextResponse.json(user);
};