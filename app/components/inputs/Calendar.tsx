'use client';

import { DateRange, Range, RangeKeyDict } from 'react-date-range';

// React Date Range styles
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

interface CalendarProps {
  value: Range;
  disabledDates?: Date[];
  onChange: (value: RangeKeyDict) => void;
}

const Calendar = ({ value, disabledDates, onChange }: CalendarProps) => {
  return (
    <DateRange
      rangeColors={['#262626']}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()} // Can't select dates in the past
      disabledDates={disabledDates}
    />
  );
};

export default Calendar;
