import { useCallback } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '@app/redux/store';
import { setIsOpened } from '../sidebarSlice';
import IconButton from '@component/form/iconButton/IconButton';
import { faBars } from '@fortawesome/free-solid-svg-icons';

interface Props {}

function OpenButton({ ...rest }: Props) {
  const dispatch = useAppDispatch();

  const onClick = useCallback(() => {
    dispatch(setIsOpened(true));
  }, [dispatch]);

  return (
    <article {...rest}>
      <IconButton iconProps={{ icon: faBars }} onClick={onClick} />
    </article>
  );
}

export default styled(OpenButton)<Props>`
  display: none;
  justify-content: flex-end;
  align-items: center;
  width: fit-content;
  background-color: #111827;
  color: #d1d5db;
  border-top-right-radius: 5em;
  border-bottom-right-radius: 5em;

  ${IconButton} {
    padding: 1em 2em;
    border-top-right-radius: 5em;
    border-bottom-right-radius: 5em;

    &:hover {
      background-color: #111827;
      color: #d1d5db;
    }
  }
`;
