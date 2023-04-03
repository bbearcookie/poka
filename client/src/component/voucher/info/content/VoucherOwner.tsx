import { User } from '@type/user';
import CardListItem from '@component/card/basic/CardListItem';
import UserProfile from '@component/profile/UserProfile';

interface Props {
  owner: User;
}

function VoucherOwner({ owner }: Props) {
  return (
    <CardListItem title="소유자">
      <UserProfile {...owner} />
    </CardListItem>
  );
}

export default VoucherOwner;
