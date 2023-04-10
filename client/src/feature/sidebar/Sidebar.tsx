import { useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@app/redux/store';
import NextIdContext from './NextIdContext';
import AdminContent from './content/AdminContent';
import UserContent from './content/UserContent';
import { Background, StyledSidebar } from './_styles';
import { setIsOpened } from './sidebarSlice';

export type BarType = 'GUEST' | 'USER' | 'ADMIN';

interface Props {
  barType: BarType;
}

function Sidebar({ barType }: Props) {
  const { isOpened } = useAppSelector(state => state.newSidebar);
  const nextId = useRef(0);
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  // 사이드바 바깥 영역이 클릭되면 사이드바를 닫는다
  useEffect(() => {
    const closeSidebar = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        dispatch(setIsOpened(false));
      }
    };

    document.body.addEventListener('mousedown', closeSidebar);
    return () => document.body.removeEventListener('mousedown', closeSidebar);
  }, [dispatch]);

  return (
    <Background isOpened={isOpened}>
      <StyledSidebar ref={ref}>
        <NextIdContext.Provider value={nextId}>
          {barType === 'ADMIN' && <AdminContent />}
          {barType === 'USER' && <UserContent />}
        </NextIdContext.Provider>
      </StyledSidebar>
    </Background>
  );
}

export default Sidebar;
