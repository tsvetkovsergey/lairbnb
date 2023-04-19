'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// Components
import Container from '../Container';
import CategoryBox from '../CategoryBox';

// Icons
import { BsSnow } from 'react-icons/bs';
import { FaSkiing } from 'react-icons/fa';
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from 'react-icons/gi';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';

// Property categories
export const categories = [
  {
    id: 'Beach',
    label: 'У пляжа',
    icon: TbBeach,
    description: 'Недвижимость недалеко от пляжа!',
  },
  {
    id: 'Windmill',
    label: 'Ветряные мельницы',
    icon: GiWindmill,
    description: 'У этой недвижимости есть мельница!',
  },
  {
    id: 'Modern',
    label: 'Современная',
    icon: MdOutlineVilla,
    description: 'Современная недвижимость!',
  },
  {
    id: 'Countryside',
    label: 'Загородные дома',
    icon: TbMountain,
    description: 'Эта недвижимость находится за городом!',
  },
  {
    id: 'Pools',
    label: 'Супербассейны',
    icon: TbPool,
    description: 'У этой недвижимости есть бассейн!',
  },
  {
    id: 'Islands',
    label: 'Острова',
    icon: GiIsland,
    description: 'Эта недвижимость находится на острове!',
  },
  {
    id: 'Lake',
    label: 'У озера',
    icon: GiBoatFishing,
    description: 'Эта недвижимость находится рядом с озером!',
  },
  {
    id: 'Skiing',
    label: 'Катание на лыжах',
    icon: FaSkiing,
    description: 'Рядом с недвижимостью можно кататься на лыжах!',
  },
  {
    id: 'Castles',
    label: 'Замки',
    icon: GiCastle,
    description: 'Недвижимость в замке!',
  },
  {
    id: 'Camping',
    label: 'Кемпинги',
    icon: GiForestCamp,
    description: 'Здесь можно остановиться в кемпинге!',
  },
  {
    id: 'Arctic',
    label: 'Арктика',
    icon: BsSnow,
    description: 'Эта недвижимость находится в Арктике!',
  },
  {
    id: 'Cave',
    label: 'Пещеры',
    icon: GiCaveEntrance,
    description: 'Эта недвижимость находится в пещере!',
  },
  {
    id: 'Desert',
    label: 'Пустыня',
    icon: GiCactus,
    description: 'Эта недвижимость находится в пустыне!',
  },
  {
    id: 'Barns',
    label: 'Амбары',
    icon: GiBarn,
    description: 'Эта недвижимость находится в сарае!',
  },
  {
    id: 'Lux',
    label: 'Luxe',
    icon: IoDiamond,
    description: 'Эта недвижимость раскошная!',
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();

  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.id}
            id={item.id}
            label={item.label}
            selected={item.id === category}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
