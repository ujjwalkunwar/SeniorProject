import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

/**
 * Retrieves the current session from the server.
 * 
 * @async
 * @returns {Promise<Object | null>} 
 *  A promise that resolves to the current session object 
 *  or null if no session exists.
 */

export async function getSession() {
  return await getServerSession(authOptions);
}

/**
 * Retrieves the current user from the database based on the session.
 * 
 * @async
 * @returns {Promise<Object | null>} 
 * A promise that resolves to the current user object or null 
 * if the user is not found or an error occurs.
 */

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if(!session?.user?.email){
      return null;
    }

    // Finding the user in the database based on email
    const currentUser = await prisma.user.findUnique({
      where:{
        email: session.user.email as string
      }
    });

    if(!currentUser) {
      return null;
    }
    // Formatting the user object
    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null
    };
    
  } 
  catch (error){
    return null;
  }
}