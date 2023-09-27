import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './css/DatePicker.css';
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
  const customInput = useRef<HTMLButtonElement>(null);

  const changeDate = (date : Date) => {
    Props.setData(toStringByFormatting(date));
    setSelectDate(date);
  }

	return (
		<DatePicker
      locale={ko}
      dateFormat="yyyy-MM-dd"
      minDate={Props.minDate ? Props.minDate : selectDate}
      selected={selectDate}
      onChange={(date: Date) => changeDate(date)}
      placeholderText={Props.placeholder}
      renderCustomHeader={({ // custom header 만들어주기
        monthDate,
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
            {monthDate.getFullYear()}년 {monthDate.getMonth() + 1}월
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