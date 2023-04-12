import AdminRouter from '@route/AdminRouter';
import UserRouter from '@route/UserRouter';
import Sidebar from '@feature/sidebar/Sidebar';
import OpenButton from '@feature/sidebar/component/OpenButton';
import { StyledPageTemplate } from './PageTemplate.style';

interface Props {
  pageType: 'USER' | 'ADMIN';
}

function PageTemplate({ pageType }: Props) {
  return (
    <StyledPageTemplate>
      {pageType === 'ADMIN' && <Sidebar barType="ADMIN" />}
      {pageType === 'USER' && <Sidebar barType="USER" />}

      <main className="page-section">
        <OpenButton />
        {pageType === 'ADMIN' && <AdminRouter />}
        {pageType === 'USER' && <UserRouter />}
      </main>
    </StyledPageTemplate>
  );
}

export default PageTemplate;
