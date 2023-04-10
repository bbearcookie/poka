import { useCallback, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@app/redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { setActiveId } from '../sidebarSlice';
import NextIdContext from '../NextIdContext';
import { Item } from './_styles';

export interface Props {
  className?: string;
  to?: string;
  text?: string;
  icon?: IconDefinition;
  addChild?: (id: number) => void;
}

function ChildItem({ className, to = '#', text, icon, addChild }: Props) {
  const { activeId } = useAppSelector(state => state.newSidebar);
  const nextId = useContext(NextIdContext);
  const id = useRef(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // 마운트시 자신의 ID 등록
  useEffect(() => {
    if (!nextId) return;

    id.current = nextId.current;
    nextId.current = nextId.current + 1;
    addChild && addChild(id.current);
  }, []);

  const onClick = useCallback(() => {
    navigate(to);
    dispatch(setActiveId(id.current));
  }, [to, navigate, dispatch]);

  return (
    <Item
      className={classNames(className, { active: activeId === id.current && id.current !== 0 })}
      onClick={onClick}
    >
      {icon && <FontAwesomeIcon icon={icon} width="1em" height="1em" />}
      <span className="text">{text}</span>
    </Item>
  );
}

export default styled(ChildItem)<Props>``;
