import React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import IconButton from '@component/form/iconButton/IconButton';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { getYearMonth } from '@util/date';
import { ko } from 'date-fns/esm/locale';
import CustomInput from './content/CustomInput';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  todayDate: Date;
  startDate: Date;
  endDate: Date;
  onChangeStartDate: (date: Date | null, e: React.SyntheticEvent<any, Event> | undefined) => void;
  onChangeEndDate: (date: Date | null, e: React.SyntheticEvent<any, Event> | undefined) => void;
}
const DefaultProps = {};

function Calendar({ todayDate, startDate, endDate, onChangeStartDate, onChangeEndDate }: Props) {
  return (
    <StyledCalendar className="Calendar">
      <DatePicker
        selected={startDate}
        onChange={onChangeStartDate}
        startDate={startDate}
        endDate={endDate}
        maxDate={todayDate}
        locale={ko}
        customInput={<CustomInput titleText="시작" date={startDate} />}
        renderCustomHeader={({ date, increaseMonth, decreaseMonth }) => (
          <CustomHeaderSection>
            <IconButton iconProps={{ icon: faChevronLeft }} onClick={decreaseMonth} />
            <h3>{getYearMonth(date)}</h3>
            <IconButton iconProps={{ icon: faChevronRight }} onClick={increaseMonth} />
          </CustomHeaderSection>
        )}
      />

      <DatePicker
        selected={endDate}
        onChange={onChangeEndDate}
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        maxDate={todayDate}
        locale={ko}
        showYearDropdown
        customInput={<CustomInput titleText="끝" date={endDate} />}
        renderCustomHeader={({ date, increaseMonth, decreaseMonth }) => (
          <CustomHeaderSection>
          <IconButton iconProps={{ icon: faChevronLeft }} onClick={decreaseMonth} />
            <h3>{getYearMonth(date)}</h3>
            <IconButton iconProps={{ icon: faChevronRight }} onClick={increaseMonth} />
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

      .icon {
        color: inherit;
      }
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
`;

const CustomHeaderSection = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0;
  font-size: 1.2em;
`;
