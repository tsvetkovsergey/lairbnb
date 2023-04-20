'use client';

import { useCallback } from 'react';
import Image from 'next/image';
import { TbPhotoPlus } from 'react-icons/tb';

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <div>
      <div className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600">
        <TbPhotoPlus size={50} />
        <p className="font-semibold text-lg">Click to upload</p>
        {value && (
          <div className="absolute inset-0 w-full h-full">
            <Image
              alt="Загрузить"
              fill
              style={{ objectFit: 'cover' }}
              src={value}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
