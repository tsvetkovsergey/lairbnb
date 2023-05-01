import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;
  if (!reservationId || typeof reservationId !== 'string') {
    throw new Error('Неверный ID бронирования');
  }

  const listingAndReservation = await prisma.reservation.deleteMany({
    where: {
      id: params.reservationId,
      // We want to ensure that the only people who can delete
      // reservation is either the creator of reservation or
      // the creator of listing (i.e. owner of property)
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  });

  return NextResponse.json(listingAndReservation);
}
