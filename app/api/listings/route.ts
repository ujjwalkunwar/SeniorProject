import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import getCurrentUser  from '@/app/actions/getCurrentUser';

/**
 * Handles the POST request to create a new listing.
 * 
 * @async
 * @param {Request} request - The incoming request object.
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object.
 */

export async function POST(
  request: Request
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  // Destructuring relevant properties from the request body
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;

  // Checking if any of the required properties are missing
  Object.keys(body).forEach((value : any) => {
    if(!body[value]){
      NextResponse.error();
    }
  });

  // Creating a new listing in the database
  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
};