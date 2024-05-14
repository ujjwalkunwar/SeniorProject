import prisma from "@/app/libs/prismadb";

/**
 * Retrieves all users from the database.
 * 
 * @async
 * @returns {Promise<Array<Object>>} 
 * A promise that resolves to an array of user objects.
 * @throws {Error} 
 * If an error occurs while fetching users.
 */

export default async function getAllUsers() {
  try {
    const allUsers = await prisma.user.findMany();

    // Formatting the user objects
    const formattedUsers = allUsers.map(user => ({
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      emailVerified: user.emailVerified?.toISOString() || null
    }));
    return formattedUsers;
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
}