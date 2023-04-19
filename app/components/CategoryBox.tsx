'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import queryString from 'query-string';

import { IconType } from 'react-icons';

interface CategoryBoxProps {
  id: string;
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBox = ({ id, icon: Icon, label, selected }: CategoryBoxProps) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    // Get params from current URL
    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    // Add new category param to current URL
    const updatedQuery: any = {
      ...currentQuery,
      category: id,
    };

    // If you clicked selected category second time
    // remove category from params to clear selection
    if (params?.get('category') === id) {
      delete updatedQuery.category;
    }

    const url = queryString.stringifyUrl(
      { url: '/', query: updatedQuery },
      { skipNull: true }
    );

    router.push(url);
  }, [id, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer ${
        selected
          ? 'border-b-neutral-800 text-neutral-800'
          : 'border-transparent text-neutral-500'
      }`}
    >
      <Icon size={26} />
      <div className="font-medium text-sm w-max">{label}</div>
    </div>
  );
};

export default CategoryBox;
