import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";

/**
 * Handles the POST request to create a new user.
 * 
 * @async
 * @param {Request} request - The incoming request object.
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object.
 */

export async function POST(
  request: Request, 
) {
  const body = await request.json();
  const { 
    email,
    name,
    password,
   } = body;

  const hashedPassword = await bcrypt.hash(password, 12);

   // Creating a new user in the database
   const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    }
  });

  return NextResponse.json(user);
}