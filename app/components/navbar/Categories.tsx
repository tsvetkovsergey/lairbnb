'use client';

import Container from '../Container';
import CategoryBox from '../CategoryBox';

import { TbBeach } from 'react-icons/tb';
import { GiWindmill } from 'react-icons/gi';
import { MdOutlineVilla } from 'react-icons/md';

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
];

const Categories = () => {
  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.id}
            id={item.id}
            label={item.label}
            // description={item.description}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
