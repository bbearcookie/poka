import { useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@app/redux/store';
import { Background, StyledSidebar } from './_styles';
import { setIsOpened } from './sidebarSlice';
import BarContent from './content/BarContent';
import UserInfo from './component/UserInfo';

export type BarType = 'GUEST' | 'USER' | 'ADMIN';

interface Props {
  barType: BarType;
}

function Sidebar({ barType }: Props) {
  const { isOpened } = useAppSelector(state => state.newSidebar);
  const { userId } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

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
        <UserInfo userId={userId} />
        <BarContent barType={barType} />
      </StyledSidebar>
    </Background>
  );
}

export default Sidebar;
