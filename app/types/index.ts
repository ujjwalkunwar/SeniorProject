import { Listing, Reservation, User } from "@prisma/client";

//Type definition for a safe listing.
export type SafeListing = Omit<
  Listing,
  "createdAt"
> & {
  createdAt: string;
}

// Type definition for a safe reservation.
export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing
}

// Type definition for a safe user.
export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified" 
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
}