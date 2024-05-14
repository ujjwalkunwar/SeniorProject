'use client';
import React, { useCallback } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';

declare global {
  var cloudinary: any;
}

/**
 * Props interface for the UploadImage component.
 */

interface UploadImageProps {
  onChange: (value: string) => void;
  value: string;
}

/**
 * A component for uploading images.
 * 
 * @param {Object} props - The props object containing component properties.
 * @param {(value: string) => void} props.onChange - A function to handle changes in the uploaded image.
 * @param {string} props.value - The URL of the uploaded image.
 * @returns {React.ReactNode} A React component for uploading images.
 */

const UploadImage: React.FC<UploadImageProps> = ({
  onChange,
  value,
}) => {
  /**
   * Callback function to handle image upload.
   * 
   * @param {any} result - The result object containing information about the uploaded image.
   */
  
  const handleUpload = useCallback((result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]);

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="wjvvuqvb"
      options={{ 
        maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="
              relative 
              cursor-pointer 
              hover:opacity-65 
              transition 
              border-dashed 
              border-2 
              p-20 
              border-neutral-250 
              flex 
              flex-col 
              justify-center 
              items-center 
              gap-4 
              text-neutral-550"
          >
            <TbPhotoPlus size={50} />
            <div className="font-bold">
              Click to upload
            </div>
            {value && (
              <div className="
                absolute 
                inset-0 
                w-full 
                h-full">
                <Image
                  alt="Upload"
                  src={value}
                  fill
                  style={{ 
                    objectFit: 'cover' 
                  }}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default UploadImage;