'use client';

import { useCallback } from 'react';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
  var cloudinary: any;
}

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
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="yk7enorm"
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
          >
            <TbPhotoPlus size={50} />
            <p className="font-semibold text-lg">Click to upload</p>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  alt="Загруженное изображение"
                  fill
                  style={{ objectFit: 'cover' }}
                  src={value}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );

  /*
  return (
    <div>
      <div
        className={`${styles.widget} [&_button]:h-full relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600`}
      >
        <TbPhotoPlus size={50} />
        <p className="font-semibold text-lg">Click to upload</p>
        {value && (
          <div className="absolute inset-0 w-full h-full">
            <Image
              alt="Загруженное изображение"
              fill
              style={{ objectFit: 'cover' }}
              src={value}
            />
          </div>
        )}
      </div>
    </div>
  );
  */
};

export default ImageUpload;
