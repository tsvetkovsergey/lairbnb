'use client';

import { useCallback, useState } from 'react';
import { signOut } from 'next-auth/react';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRentModal from '@/app/hooks/useRentModal';
import { useRouter } from 'next/navigation';

import MenuItem from './MenuItem';
import Avatar from '../Avatar';

import { SafeUser } from '@/app/types';

import { AiOutlineMenu } from 'react-icons/ai';

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openRegisterModal = useRegisterModal((state) => state.onOpen);
  const openLoginModal = useLoginModal((state) => state.onOpen);
  const openRentModal = useRentModal((state) => state.onOpen);

  const router = useRouter();

  const toggleOpen = useCallback(() => {
    setIsOpen((curValue) => !curValue);
  }, []);

  const handleRent = useCallback(() => {
    // Open Login Modal
    if (!currentUser) {
      return openLoginModal();
    }

    // Open Rent Modal
    openRentModal();
  }, [currentUser, openLoginModal, openRentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={handleRent}
          className="hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block"
        >
          Сдать жильё на Lairbnb
        </div>
        <div
          onClick={toggleOpen}
          className="flex cursor-pointer flex-row items-center gap-3 rounded-full border border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4">
          <div className="flex cursor-pointer flex-col">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push('/trips')}
                  label="Мои поездки"
                />
                <MenuItem
                  onClick={() => router.push('/favorites')}
                  label="Избранное"
                />
                <MenuItem
                  onClick={() => router.push('/reservations')}
                  label="Мои бронирования"
                />
                <MenuItem
                  onClick={() => router.push('/properties')}
                  label="Моё жильё"
                />
                <MenuItem onClick={openRentModal} label="Сдать моё жильё" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Выйти" />
              </>
            ) : (
              <>
                <MenuItem onClick={openLoginModal} label="Войти" />
                <MenuItem
                  onClick={openRegisterModal}
                  label="Зарегестрироваться"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
