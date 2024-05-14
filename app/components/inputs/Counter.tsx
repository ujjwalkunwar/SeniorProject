'use client';
import React, { useCallback } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

/**
 * Props interface for the Counter component.
 */

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

/**
 * Represents a counter component.
 * @component
 *
 * @param {object} props - The props object.
 * @param {string} props.title - The title of the counter.
 * @param {string} props.subtitle - The subtitle of the counter.
 * @param {number} props.value - The current value of the counter.
 * @param {(value: number) => void} props.onChange - The function to call when the value of the counter changes.
 * @returns {JSX.Element} The counter component.
 */

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 1) {
      return;
    }
    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="
      flex 
      flex-row 
      items-center 
      justify-between">
      <div className="
        flex 
        flex-col">
        <div className="font-medium">
          {title}
        </div>
        <div className="
          font-light 
          text-gray-600">
          {subtitle}
        </div>
      </div>
      <div className="
        flex 
        flex-row 
        items-center 
        gap-4">
        <div
          onClick={onReduce}
          className="
            w-10 
            h-10 
            rounded-full 
            border-[1px] 
            border-neutral-350 
            flex items-center 
            justify-center 
            text-neutral-590 
            cursor-pointer 
            hover:opacity-75 
            transition"
        >
          <AiOutlineMinus />
        </div>
        <div className="
          font-light 
          text-xl 
          text-neutral-590">
          {value}
        </div>
        <div
          onClick={onAdd}
          className="
            w-10 
            h-10 
            rounded-full 
            border-[1px] 
            border-neutral-350 
            flex items-center 
            justify-center 
            text-neutral-590 
            cursor-pointer 
            hover:opacity-75 
            transition"
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default Counter;