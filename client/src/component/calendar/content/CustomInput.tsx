import React, { useCallback, forwardRef } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { getYearMonthDay } from '@util/date';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  titleText: string;
  date: Date;
  onClick?: React.MouseEventHandler;
}
const DefaultProps = {};

const CustomInput = forwardRef<HTMLInputElement, Props>(({ titleText, date, onClick }, ref) => {
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) onClick(e);
  }, [onClick]);

  return (
    <CalendarButton onClick={handleClick}>
      <section>
        <b>{titleText}</b>
        <div>{getYearMonthDay(date)}</div>
      </section>
      <div className="space" />
      <FontAwesomeIcon className="icon" icon={faCalendar} />
    </CalendarButton>
  );
});

export default CustomInput;

const CalendarButton = styled.div`
  display: flex;
  align-items: center;
  padding: 1em;
  border-radius: 5em;
  transition: 0.1s all;

  .space { flex-grow: 1; }
  .icon { color: gray; }
`