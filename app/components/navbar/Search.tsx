'use client';

import { useMemo } from 'react';
import useCountries from '@/app/hooks/useCountries';
import useSearchModal from '@/app/hooks/useSearchModal';
import { useSearchParams } from 'next/navigation';
import { BiSearch } from 'react-icons/bi';
import { differenceInDays } from 'date-fns';
import formatLabelForDigit from '@/app/utils/formatLabelForDigit';

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get('locationValue');
  const startDate = params?.get('startDate');
  const endDate = params?.get('endDate');
  const guestCount = params?.get('guestCount');

  const locationLabel = useMemo(() => {
    return locationValue ? getByValue(locationValue)?.label : 'Искать везде';
  }, [getByValue, locationValue]);

  const durationLabel = useMemo(() => {
    if (!(startDate && endDate)) {
      return 'Неделя';
    }

    let diff = differenceInDays(new Date(endDate), new Date(startDate));
    !diff && (diff = 1);

    return `${diff} ${formatLabelForDigit(diff, ['день', 'дня', 'дней'])}`;
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (!guestCount || !parseInt(guestCount)) {
      return 'Кто едет?';
    }
    return `${guestCount} ${formatLabelForDigit(parseInt(guestCount), [
      'гость',
      'гостя',
      'гостей',
    ])}`;
  }, [guestCount]);

  return (
    <button
      onClick={searchModal.onOpen}
      className="w-full cursor-pointer rounded-full border py-2 shadow-sm transition hover:shadow-md md:w-auto"
    >
      <div className="flex flex-row items-center justify-between">
        <p className="px-6 text-sm font-semibold">{locationLabel}</p>
        <p className="hidden flex-1 border-x px-6 text-center text-sm font-semibold sm:block">
          {durationLabel}
        </p>
        <div className="flex flex-row items-center gap-3 pl-6 pr-2 text-sm text-gray-600">
          <p className="hidden sm:block">{guestLabel}</p>
          <i className="rounded-full bg-rose-500 p-2 text-white">
            <BiSearch size={18} />
          </i>
        </div>
      </div>
    </button>
  );
};

export default Search;
