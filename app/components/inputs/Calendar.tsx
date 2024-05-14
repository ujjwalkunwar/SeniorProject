'use client';

import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

/**
 * Props interface for the Calendar component.
 */

interface CalendarProps {
  value: Range;
  disabledDates: Date[];
  onChange: (value: RangeKeyDict) => void;
}

/**
 * A calendar component for selecting date ranges.
 * 
 * @param {Object} props - The props object containing component properties.
 * @param {Range} props.value - The currently selected date range.
 * @param {Date[]} props.disabledDates - An array of dates that are disabled for selection.
 * @param {(value: RangeKeyDict) => void} props.onChange - A function to handle changes in the selected date range.
 * @returns {React.ReactNode} A React component representing a calendar for selecting date ranges.
 */

const Calendar: React.FC<CalendarProps> = ({
  value,
  disabledDates,
  onChange,
}) => {
  return (
    <DateRange
      rangeColors={['#3b3b3b']}
      ranges={
        [value]
      }
      date={
        new Date()
      }
      direction="vertical"
      onChange={onChange}
      showDateDisplay={false}
      minDate={
        new Date()
      }
      disabledDates={
        disabledDates
      }
    />
  );
};
export default Calendar;