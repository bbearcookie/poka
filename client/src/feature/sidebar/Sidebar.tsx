import { useRef } from 'react';
import NextIdContext from './NextIdContext';
import { Background, StyledSidebar } from './_styles';
import AdminContent from './content/AdminContent';
import UserContent from './content/UserContent';

export type BarType = 'GUEST' | 'USER' | 'ADMIN';

interface Props {
  barType: BarType;
}

function Sidebar({ barType }: Props) {
  const nextId = useRef(0);

  return (
    <Background>
      <StyledSidebar>
        <NextIdContext.Provider value={nextId}>
          {barType === 'ADMIN' && <AdminContent />}
          {barType === 'USER' && <UserContent />}
        </NextIdContext.Provider>
      </StyledSidebar>
    </Background>
  );
}

export default Sidebar;
