'use client';

import React from 'react';
import { IconType } from 'react-icons';

/**
 * Props interface for the ListingCategory component.
 */
interface ListingCategoryProps {
  icon: IconType;
  description: string;
  label: string;
}

/**
 * A component representing a listing category.
 * 
 * @param {Object} props - The props object containing component properties.
 * @param {IconType} props.icon - The icon component to be displayed.
 * @param {string} props.description - The description of the category.
 * @param {string} props.label - The label or title of the category.
 * @returns {React.ReactNode} A React component representing a listing category.
 */
const ListingCategory: React.FC<ListingCategoryProps> = ({
  icon: Icon,
  description,
  label,
}) => {
  return (
    <div className="
      flex 
      flex-col 
      gap-6">
      <div className="
        flex 
        flex-row 
        items-center 
        gap-4">
        <Icon size={42} className="
          text-neutral-500" />
        <div className="
          flex 
          flex-col">
          <div className="
            text-lg 
            font-semibold">
            {label}
          </div>
          <div className="
            text-neutral-400 
            font-light">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCategory;