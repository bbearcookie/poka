import { Children, Fragment } from 'react';
import { Role } from '@/type/user';
import { faArrowLeft, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import ChildItem from '@feature/sidebar/item/child/ChildItem';
import { StyledItemList } from '@feature/sidebar/item/_styles';
import useLogout from '@feature/auth/hook/useLogout';

interface Props {
  isOpened: boolean;
  role: Role;
}

function ItemList({ isOpened, role }: Props) {
  const handleLogout = useLogout();

  const render = () => {
    switch (role) {
      case 'admin':
        return [
          <Fragment key={role}>
            <ChildItem icon={faArrowLeft} to="/" text="회원 페이지" />
            <ChildItem icon={faArrowLeft} to="/admin" text="관리자 페이지" />
            <ChildItem icon={faUpRightFromSquare} onClick={handleLogout} text="로그아웃" />
          </Fragment>,
        ];
      case 'user':
        return [
          <Fragment key={role}>
            <ChildItem icon={faUpRightFromSquare} onClick={handleLogout} text="로그아웃" />
          </Fragment>,
        ];
      default:
        return [<></>];
    }
  };

  const children = render()[0].props.children;

  return (
    <StyledItemList isOpened={isOpened} length={Children.count(children)}>
      {children}
    </StyledItemList>
  );
}

export default ItemList;
