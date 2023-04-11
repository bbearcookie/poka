import { Children, Fragment } from 'react';
import { Role } from '@/type/user';
import ChildItem from '@feature/sidebar/item/child/ChildItem';
import { StyledItemList } from '@feature/sidebar/item/_styles';

interface Props {
  isOpened: boolean;
  role: Role;
}

function ItemList({ isOpened, role }: Props) {
  const render = () => {
    switch (role) {
      case 'admin':
        return [
          <Fragment key="admin">
            <ChildItem text="ㅇㅇ" />
            <ChildItem text="ㅇㅇ" />
            <ChildItem text="ㅇㅇ" />
          </Fragment>,
        ];
      case 'user':
        return [
          <Fragment key={role}>
            <p>사용자1</p>
            <p>사용자1</p>
            <p>사용자1</p>
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
