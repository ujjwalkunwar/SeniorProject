import { PrismaClient } from "@prisma/client"

/**
 * Prisma client instance.
 * 
 * @global
 * @type {PrismaClient}
 * @description The PrismaClient instance used to interact with the database.
 */
declare global {
  var prisma: PrismaClient | undefined
}

/**
 * Prisma client singleton.
 * 
 * @description Creates a PrismaClient instance if it doesn't exist and exports it.
 */
const client = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") globalThis.prisma = client

export default client;