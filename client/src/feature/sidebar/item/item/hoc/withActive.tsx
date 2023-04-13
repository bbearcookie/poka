import { useCallback, useEffect, useRef, useContext } from 'react';
import classNames from 'classnames';
import { useAppSelector, useAppDispatch } from '@app/redux/store';
import { setActiveId } from '../../../sidebarSlice';
import NextIdContext from '../../../content/nextIdContext';
import Item, { Props as WrappedProps } from '../Item';

export interface Props extends WrappedProps {
  registerToParent?: (childId: number) => void;
}

const withActive = (ItemComponent: typeof Item) => {
  return (props: Props) => {
    const { activeId } = useAppSelector(state => state.sidebar);
    const nextId = useContext(NextIdContext);
    const id = useRef(0);
    const dispatch = useAppDispatch();

    // 마운트시 자신의 ID 등록
    useEffect(() => {
      if (!nextId) return;

      id.current = nextId.current;
      nextId.current = nextId.current + 1;
      props.registerToParent && props.registerToParent(id.current);
    }, []);

    const handleSetActiveId = useCallback(() => {
      dispatch(setActiveId(id.current));
    }, [dispatch]);

    return (
      <ItemComponent
        {...props}
        className={classNames(props.className, {
          'active_with_background': activeId === id.current && id.current !== 0,
        })}
        onClick={handleSetActiveId}
      />
    );
  };
};

export default withActive(Item);
