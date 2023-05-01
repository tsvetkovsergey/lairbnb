import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import useLoginModal from './useLoginModal';
import { toast } from 'react-hot-toast';

import { SafeUser } from '@/app/types';

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const favoriteIds = currentUser?.favoriteIds || [];
    return favoriteIds.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      let request;
      let message;
      if (hasFavorited) {
        request = () => axios.delete(`/api/favorites/${listingId}`);
        message = 'Удалено из избранного';
      } else {
        request = () => axios.post(`/api/favorites/${listingId}`);
        message = 'Добавлено в избранное';
      }

      try {
        await request();
        router.refresh();
        toast.success(message);
      } catch (error) {
        toast.error('Что-то пошло не так!');
      }
    },
    [currentUser, loginModal, hasFavorited, listingId, router]
  );

  return { hasFavorited, toggleFavorite };
};

export default useFavorite;
