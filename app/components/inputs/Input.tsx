'use client';

import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

/**
 * Props interface for the Input component.
 */

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors
}

/**
 * A customizable input component.
 * 
 * @param {Object} props - The props object containing component properties.
 * @param {string} props.id - The id of the input field.
 * @param {string} props.label - The label text for the input field.
 * @param {string} [props.type="text"] - The type of input field (default is "text").
 * @param {boolean} [props.disabled] - Whether the input field is disabled.
 * @param {boolean} [props.formatPrice] - Whether to format the input as a price.
 * @param {boolean} [props.required] - Whether the input field is required.
 * @param {UseFormRegister<FieldValues>} props.register - The register function from react-hook-form.
 * @param {FieldErrors<FieldValues>} props.errors - Errors object from react-hook-form.
 * @returns {React.ReactNode} A React component representing a customizable input field.
 */

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text", 
  disabled, 
  formatPrice,
  register,
  required,
  errors,
}) => {
  return(
    <div className="
      w-full 
      relative">
      {formatPrice && (
        <BiDollar
          size={24}  
          className="
            text-neutral-700
            absolute
            top-5
            left-2
          "
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`
          peer
          w-full
          p-4
          pt-6 
          font-light 
          bg-white 
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${errors[id] ? 'border-blue-500' : 'border-neutral-300'}
          ${errors[id] ? 'focus:border-blue-500' : 'focus:border-black'}
        `}
      />
      <label 
        className={`
          absolute 
          text-md
          duration-150 
          transform 
          -translate-y-3 
          top-5 
          z-10 
          origin-[0] 
          ${formatPrice ? 'left-9' : 'left-4'}
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? 'text-blue-500' : 'text-zinc-400'}
        `}
      >
        {label}
      </label>
    </div>
  );
}

export default Input;