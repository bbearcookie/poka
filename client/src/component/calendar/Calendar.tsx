import React, { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import IconButton from '@component/form/IconButton';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { getYearMonth } from '@util/date';
import { ko } from 'date-fns/esm/locale';
import CustomInput from './content/CustomInput';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {

}
const DefaultProps = {};

function Calendar({  }: Props) {
  const today = useRef(new Date());
  const [startDate, setStartDate] = useState(new Date(new Date().setDate(today.current.getDate() - 30)));
  const [endDate, setEndDate] = useState(today.current);

  const onChangeStartDate = useCallback((date: Date | null, e: React.SyntheticEvent<any, Event> | undefined) => {
    if (!date) return;
    setStartDate(date);
    if (date > endDate) setEndDate(date);
  }, [endDate]);

  const onChangeEndDate = useCallback((date: Date | null, e: React.SyntheticEvent<any, Event> | undefined) => {
    if (!date) return;
    setEndDate(date);
  }, []);

  return (
    <StyledCalendar className="Calendar">
      <DatePicker
        selected={startDate}
        onChange={onChangeStartDate}
        startDate={startDate}
        endDate={endDate}
        maxDate={today.current}
        locale={ko}
        customInput={<CustomInput titleText="시작" date={startDate} />}
        renderCustomHeader={({ date, increaseMonth, decreaseMonth }) => (
          <CustomHeaderSection>
            <IconButton icon={faChevronLeft} onClick={decreaseMonth} />
            <h3>{getYearMonth(date)}</h3>
            <IconButton icon={faChevronRight} onClick={increaseMonth} />
          </CustomHeaderSection>
        )}
      />

      <DatePicker
        selected={endDate}
        onChange={onChangeEndDate}
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        maxDate={today.current}
        locale={ko}
        showYearDropdown
        customInput={<CustomInput titleText="끝" date={endDate} />}
        renderCustomHeader={({ date, increaseMonth, decreaseMonth }) => (
          <CustomHeaderSection>
            <IconButton icon={faChevronLeft} onClick={decreaseMonth} />
            <h3>{getYearMonth(date)}</h3>
            <IconButton icon={faChevronRight} onClick={increaseMonth} />
          </CustomHeaderSection>
        )}
      />
    </StyledCalendar>
  );
}

export default Calendar;

const StyledCalendar = styled.div`
  display: flex;
  background-color: white;
  justify-content: center;
  border-radius: 20px;

  .react-datepicker {
    border-radius: 20px;
    padding: 1em;
  }

  .react-datepicker-wrapper {
    border-radius: 20px;
    cursor: pointer;
    border: 1px solid transparent;
    transition: 0.1s all;

    &:hover {
      border: 1px solid rgb(222, 222, 225);
      background-color: rgb(249, 249, 250);

      .icon { color: inherit; }
    }
  }

  .react-datepicker__header {
    background-color: white;
    border: none;
  }

  .react-datepicker__day {
    border-radius: 10em;
    transition: all 0.1s;
  }
`

const CustomHeaderSection = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0;
  font-size: 1.2em;
`