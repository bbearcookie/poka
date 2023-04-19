import { Fragment } from 'react';
import { isAdmin } from '@util/user';
import classNames from 'classnames';
import { useLocation } from 'react-router';
import { Role } from '@/type/user';
import { faArrowLeft, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import ChildItem from '@feature/sidebar/item/item/Item';
import ItemList from '@feature/sidebar/item/item_list/ItemList';
import useLogout from '@feature/auth/hook/useLogout';

interface Props {
  isOpened: boolean;
  role: Role;
}

function LinkItems({ isOpened, role, ...rest }: Props) {
  const handleLogout = useLogout();
  const location = useLocation();

  const render = () => {
    if (isAdmin(role)) {
      return [
        <Fragment key={role}>
          <ChildItem
            className={classNames({ active: !/^\/admin/.test(location.pathname) })}
            icon={faArrowLeft}
            to="/"
            text="회원 페이지"
          />
          <ChildItem
            className={classNames({ active: /^\/admin/.test(location.pathname) })}
            icon={faArrowLeft}
            to="/admin"
            text="관리자 페이지"
          />
          <ChildItem icon={faUpRightFromSquare} onClick={handleLogout} text="로그아웃" />
        </Fragment>,
      ];
    } else {
      return [
        <Fragment key={role}>
          <ChildItem icon={faUpRightFromSquare} onClick={handleLogout} text="로그아웃" />
        </Fragment>,
      ];
    }
  };

  const children = render()[0].props.children;

  return (
    <ItemList {...rest} isOpened={isOpened}>
      {children}
    </ItemList>
  );
}

export default LinkItems;
