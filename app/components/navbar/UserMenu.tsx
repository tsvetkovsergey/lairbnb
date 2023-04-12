'use client';

import { useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { User } from '@prisma/client';

interface UserMenuProps {
  currentUser?: User | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openRegisterModal = useRegisterModal((state) => state.onOpen);
  const openLoginModal = useLoginModal((state) => state.onOpen);

  const toggleOpen = useCallback(() => {
    setIsOpen((curValue) => !curValue);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Сдать жильё на Lairbnb
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem onClick={() => {}} label="Мои поездки" />
                <MenuItem onClick={() => {}} label="Избранное" />
                <MenuItem onClick={() => {}} label="Мои бронирования" />
                <MenuItem onClick={() => {}} label="Настройки" />
                <MenuItem onClick={() => {}} label="Сдать моё жильё" />
                <hr />
                <MenuItem onClick={() => {}} label="Выйти" />
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
