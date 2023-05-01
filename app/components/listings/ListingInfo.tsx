'use client';

import dynamic from 'next/dynamic';
import useCountries from '@/app/hooks/useCountries';
import formatLabelForDigit from '@/app/utils/formatLabelForDigit';
import { SafeUser } from '@/app/types';
import { IconType } from 'react-icons';

import Avatar from '../Avatar';
import ListingCategory from './ListingCategory';

const Map = dynamic(() => import('../Map'), { ssr: false });

interface ListingInfoProps {
  user: SafeUser;
  category?: {
    id: string;
    label: string;
    icon: IconType;
    description: string;
  };
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  locationValue: string;
}

const ListingInfo = ({
  user,
  category,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  locationValue,
}: ListingInfoProps) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2 text-xl font-semibold">
          <p>Владелец этой недвижимости {user.name}</p>
          <Avatar src={user.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <p>
            {guestCount}{' '}
            {formatLabelForDigit(guestCount, ['гость', 'гостя', 'гостей'])}
          </p>
          <p>
            {roomCount}{' '}
            {formatLabelForDigit(roomCount, ['комната', 'комнаты', 'комнат'])}
          </p>
          <p>
            {bathroomCount}{' '}
            {formatLabelForDigit(bathroomCount, ['ванная', 'ванные', 'ванных'])}
          </p>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <p className="text-lg font-light text-neutral-500">{description}</p>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
