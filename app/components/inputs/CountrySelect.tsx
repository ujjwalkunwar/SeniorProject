'use client';

import useCountries from '@/app/hooks/useCountries';
import React from 'react';
import Select from 'react-select';

/**
 * Represents the structure of a country select value.
 */

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

/**
 * Props interface for the CountrySelect component.
 */
interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

/**
 * A dropdown select component for selecting countries.
 * 
 * @param {Object} props - The props object containing component properties.
 * @param {CountrySelectValue} props.value - The currently selected country.
 * @param {(value: CountrySelectValue) => void} props.onChange - A function to handle changes in the selected country.
 * @returns {React.ReactNode} A React component representing a dropdown select for countries.
 */

const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange,
}) => {
  const { getAll } = useCountries(); // Custom hook to fetch countries

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="
            flex 
            flex-row 
            items-center 
            gap-3">
            <div>
              {option.flag}
            </div>
            <div>
              {option.label}, 
              <span className="
                text-neutral-800 
                ml-1">
                {option.region}
              </span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg',
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#add9ff',
          },
        })}
      />
    </div>
  );
}

export default CountrySelect;