import { NextResponse } from "next/server";
import getAllUsers from "@/app/actions/getAllUsers";

/**
 * Handles the POST request to handle forgot passowrd request.
 * 
 * @async
 * @param {Request} request - The incoming request object.
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object.
 */

export async function POST(
  request: Request, 
) {
  const body = await request.json();
  const {email} = body;

  try {
    const allUsers = await getAllUsers();

    if (allUsers === null) {
      throw new Error("Error fetching users");
    }

    const userWithEmail = allUsers.find(user => user.email === email);
    const recoveryEmail = userWithEmail?.email;

    if (!userWithEmail) {
      return NextResponse.json({ error: 'Email does not exist' }, { status: 404 });
    }

    return NextResponse.json(userWithEmail);
  } 
  catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
