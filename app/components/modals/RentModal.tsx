'use client';

import { useEffect, useMemo, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import useRentModal from '@/app/hooks/useRentModal';
import dynamic from 'next/dynamic';

import Modal from './Modal';
import Heading from '../Heading';
import CategoryInput from '../inputs/CategoryInput';
import CountrySelect from '../inputs/CountrySelect';
import Counter from '../inputs/Counter';

import { categories } from '../navbar/Categories';
import ImageUpload from '../inputs/ImageUpload';

enum STEPS {
  CATEGORY,
  LOCATION,
  INFO,
  IMAGES,
  DESCRIPTION,
  PRICE,
}

type Props = {};

const RentModal = (props: Props) => {
  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    },
  });

  const category = watch('category');
  const location = watch('location');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');

  const Map = useMemo(
    () => dynamic(() => import('../Map'), { ssr: false }),
    [location] // eslint-disable-line
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onPrev = () => setStep(step - 1);
  const onNext = () => setStep(step + 1);

  useEffect(() => {}, [location]);

  const actionLabel = useMemo(() => {
    // If you are on the last step
    // action label should be 'Создать'
    if (step === STEPS.PRICE) {
      return 'Создать';
    }

    return 'Вперёд';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    // If you are on the first step don't show
    // 'Назад' button
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return 'Назад';
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Что лучше всего описывает Вашу недвижимость?"
        subtitle="Выберите категорию"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((cat) => (
          <div key={cat.id} className="col-span-1">
            <CategoryInput
              id={cat.id}
              onClick={(category) => setCustomValue('category', category)}
              selected={cat.id === category}
              label={cat.label}
              icon={cat.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Где Ваша недвижимость находится?"
          subtitle="Помогите гостям найти Вас!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue('location', value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Расскажите немного о Вашем месте жилья"
          subtitle="Какие удобства у Вас есть?"
        />
        <Counter
          title="Гости"
          subtitle="Сколько гостей может остановиться?"
          value={guestCount}
          onChange={(value) => setCustomValue('guestCount', value)}
        />
        <hr />
        <Counter
          title="Комнаты"
          subtitle="Сколько у Вас комнат?"
          value={roomCount}
          onChange={(value) => setCustomValue('roomCount', value)}
        />
        <hr />
        <Counter
          title="Ванные"
          subtitle="Сколько у Вас ванных комнат?"
          value={bathroomCount}
          onChange={(value) => setCustomValue('bathroomCount', value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Добавьте фотографию Вашей недвижимости"
          subtitle="Покажите гостям, как выглядит Ваша недвижимость!"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue('imageSrc', value)}
        />
      </div>
    );
  }

  return (
    <Modal
      title="Сдать жильё на Lairbnb!"
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      // onSubmit={step === STEPS.PRICE ? handleSubmit : onNext}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onPrev}
      body={bodyContent}
    />
  );
};

export default RentModal;
