'use client';

import axios from 'axios';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Container from '../components/Container';
import Heading from '../components/Heading';

import ListingCard from '../components/listings/ListingCard';

import { SafeListing, SafeUser } from '../types';

interface TripsClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const TripsClient = ({ listings, currentUser }: TripsClientProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const handleCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success('Жильё удалено');
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error || 'Что-то пошло не так!');
        })
        .finally(() => {
          setDeletingId('');
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Моё жильё" subtitle="Список Вашего жилья" />
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={handleCancel}
            disabled={deletingId === listing.id}
            actionLabel="Удалить жильё"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
