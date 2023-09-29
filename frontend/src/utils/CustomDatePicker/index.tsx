import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './css/DatePicker2.css';
import LeftArrow from './img/left_arrow.png';
import RightArrow from './img/right_arrow.png';
import { ko } from 'date-fns/esm/locale';
import {toStringByFormatting} from '@/utils/date/DateFormatter';

interface DatePickerProps {
  setData : (value: string) => void;
  placeholder : string;
  settingDate? : Date;
  minDate? : Date;
  maxDate? : Date;
  
}

const CustomDatePicker = (Props : DatePickerProps) => {
  const [selectDate, setSelectDate] = useState<Date>(Props.settingDate as Date);

  useEffect(() => {if(Props.settingDate != undefined) setSelectDate(() => Props.settingDate!);}, [Props]);

  const changeDate = (date : Date) => {
    Props.setData(toStringByFormatting(date));
    setSelectDate(date);
  }

  const years = Array.from(new Array(80), (val, index) => (new Date().getFullYear() - index).toString()); 

	return (
		<DatePicker
      locale={ko}
      dateFormat="yyyy-MM-dd"
      showYearDropdown
      minDate={Props.minDate}
      maxDate={Props.maxDate}
      selected={selectDate}
      onChange={(date: Date) => changeDate(date)}
      placeholderText={Props.placeholder}
      renderCustomHeader={({ // custom header 만들어주기
        date,
        changeYear,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className="date-customheader">
          <button type='button' onClick={() => decreaseMonth()} style={{width: '8px'}} disabled={prevMonthButtonDisabled}>
            <img src={LeftArrow} alt="왼쪽 화살표 아이콘" />
          </button>
          <div>
            <select
            className='bg-green'
            value={date.getFullYear().toString()}
            onChange={({ target: { value } }) => changeYear(Number(value))}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span> {date.getMonth() + 1}월</span>
          </div>
          <button type='button' onClick={() => increaseMonth()} style={{width: '8px'}} disabled={nextMonthButtonDisabled}>
            <img src={RightArrow} alt="오른쪽 화살표 아이콘" />
          </button>
        </div>
      )}
    />
    )
}

export default CustomDatePicker;