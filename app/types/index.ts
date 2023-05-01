import { Listing, Reservation, User } from '@prisma/client';

export type SafeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type SafeListing = Omit<Listing, 'createdAt'> & {
  createdAt: string;
};

export type SafeReservation = Omit<
  Reservation,
  'startDate' | 'endDate' | 'createdAt' | 'listing'
> & {
  startDate: string;
  endDate: string;
  createdAt: string;
  listing: SafeListing;
};
