import prisma from '@/app/libs/prismadb';

export interface GetListingsParams {
  userId?: string;
  guestCount?: string;
  roomCount?: string;
  bathroomCount?: string;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(params: GetListingsParams) {
  try {
    const {
      userId,
      guestCount,
      roomCount,
      bathroomCount,
      startDate,
      endDate,
      locationValue,
      category,
    } = params;

    let query: any = {};
    userId && (query.userId = userId);
    category && (query.category = category);
    if (guestCount && parseInt(guestCount))
      query.guestCount = { gte: parseInt(guestCount) };
    if (roomCount && parseInt(roomCount))
      query.roomCount = { gte: parseInt(roomCount) };
    if (bathroomCount && parseInt(bathroomCount))
      query.bathroomCount = { gte: parseInt(bathroomCount) };
    locationValue && (query.locationValue = locationValue);

    // Filter out all listings which have a reservation
    // in our desired date range
    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: endDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    const listings = await prisma.listing.findMany({
      orderBy: { createdAt: 'desc' },
      where: query,
    });

    return listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
  } catch (error: any) {
    throw new Error(error);
  }
}
