'use client';
import React from 'react';
import { IconType } from 'react-icons';

/**
 * Props interface for the CategoryInput.
 */
interface CategoryInputProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

/**
 * Represents a category input component.
 * @component
 *
 * @param {object} props - The props object.
 * @param {IconType} props.icon - The icon to display.
 * @param {string} props.label - The label for the category.
 * @param {boolean} [props.selected] - Whether the category is selected or not.
 * @param {(value: string) => void} props.onClick - The function to call when the category is clicked.
 * @returns {JSX.Element} The category input component.
 */

const CategoryInput: React.FC<CategoryInputProps> = ({
  icon: Icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
        rounded-xl 
        border-2 
        p-4 
        flex 
        flex-col 
        gap-3 
        hover:border-black 
        transition 
        cursor-pointer 
      ${
        selected ? 'border-black' : 'border-neutral-200'
      }`}
    >
      <Icon size={30} />
      <div className="
        font-semibold">
        {label}
      </div>
    </div>
  );
};

export default CategoryInput;