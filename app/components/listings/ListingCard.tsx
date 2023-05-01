'use client';

import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import useCountries from '@/app/hooks/useCountries';
import { format } from 'date-fns';
import { formatRubles } from '@/app/utils/currencyFormat';

import Image from 'next/image';
import HeartButton from '../HeartButton';
import Button from '../Button';

import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import ru from 'date-fns/locale/ru';
import { categories } from '../navbar/Categories';

interface ListingCardProps {
  data: SafeListing;
  currentUser?: SafeUser | null;
  reservation?: SafeReservation;
  disabled?: boolean;
  onAction?: (id: string) => void;
  actionLabel?: string;
  actionId?: string;
}

const ListingCard = ({
  data,
  currentUser,
  reservation,
  disabled,
  onAction,
  actionLabel,
  actionId = '',
}: ListingCardProps) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);
  const categoryName = categories.find((c) => c.id === data.category)?.label;

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP', { locale: ru })} - ${format(end, 'PP', {
      locale: ru,
    })}`;
  }, [reservation]);

  return (
    <div
      onClick={() => {
        router.push(`/listings/${data.id}`);
      }}
      className="group col-span-1 cursor-pointer"
    >
      <div className="flex w-full flex-col gap-2">
        {/* IMAGE */}
        <div className="relative aspect-square w-full overflow-hidden rounded-xl">
          <Image
            fill
            alt="Недвижимость"
            src={data.imageSrc}
            className="h-full w-full object-cover transition group-hover:scale-110"
          />
          <div className="absolute right-3 top-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        {/* LABEL */}
        <p className="text-lg font-semibold">
          {location?.region}, {location?.label}
        </p>
        <p className="font-light text-neutral-500">
          {reservationDate || categoryName}
        </p>
        <div className="flex flex-row items-center gap-1">
          <p className="font-semibold">{formatRubles(price)}</p>
          {!reservation && <p className="font-light">ночь</p>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
