'use client';

import { useCallback, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useSearchModal from '@/app/hooks/useSearchModal';
import dynamic from 'next/dynamic';
import queryString from 'query-string';
import { formatISO } from 'date-fns';

import Modal from './Modal';
import Heading from '../Heading';
import { Range } from 'react-date-range';
import Calendar from '../inputs/Calendar';
import Counter from '../inputs/Counter';
import CountrySelect, { CountrySelectValue } from '../inputs/CountrySelect';

enum STEPS {
  LOCATION,
  DATE,
  INFO,
}

const SearchModal = () => {
  const searchModal = useSearchModal();
  const router = useRouter();
  const params = useSearchParams();

  const [step, setStep] = useState(STEPS.LOCATION);
  const [location, setLocation] = useState<CountrySelectValue>();
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const Map = useMemo(
    () => dynamic(() => import('../Map'), { ssr: false }),
    [location] // eslint-disable-line
  );

  const onBack = useCallback(() => {
    setStep((step) => step - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((step) => step + 1);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    // Get params from current URL
    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    // Add new params to query
    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    // Convert query object to URL string
    const url = queryString.stringifyUrl(
      { url: '/', query: updatedQuery },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();

    router.push(url);
  }, [
    bathroomCount,
    dateRange,
    guestCount,
    location,
    onNext,
    params,
    roomCount,
    router,
    searchModal,
    step,
  ]);

  const actionLabel = useMemo(() => {
    return step === STEPS.INFO ? 'Найти' : 'Дальше';
  }, [step]);

  const secondaryLabel = useMemo(() => {
    return step === STEPS.LOCATION ? undefined : 'Назад';
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Куда бы Вы хотели отправиться?"
        subtitle="Найдите идеальное место!"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Когда Вы планируете поездку?"
          subtitle="Убедитесь, что эти даты свободны!"
        />
        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Больше информации"
          subtitle="Найдите Ваше идеальное место!"
        />
        <Counter
          title="Гости"
          subtitle="Сколько гостей приедет?"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <Counter
          title="Комнаты"
          subtitle="Сколько комнат Вам нужно?"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <Counter
          title="Ванные"
          subtitle="Сколько ванных комнат Вам нужно?"
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    );
  }

  return (
    <Modal
      body={bodyContent}
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={handleSubmit}
      title="Фильтры"
      actionLabel={actionLabel}
      secondaryAction={onBack}
      secondaryActionLabel={secondaryLabel}
    />
  );
};

export default SearchModal;
