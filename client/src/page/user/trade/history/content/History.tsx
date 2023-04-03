import PhotoInfo from '@component/photocard/info/PhotoInfo';
import CardListItem from '@component/card/basic/CardListItem';
import UserProfile from '@component/profile/UserProfile';
import { getFormattedTime } from '@util/date';
import { Photo } from '@type/photo';
import { HistorySection } from './_styles';

interface Props {
  photo: Photo;
  destUser: {
    username: string;
    nickname: string;
    imageName: string;
  };
  originUser: {
    username: string;
    nickname: string;
    imageName: string;
  };
  loggedTime: Date;
}

function History({ photo, destUser, originUser, loggedTime }: Props) {
  return (
    <HistorySection>
      <CardListItem title="포토카드">
        <PhotoInfo {...photo} />
      </CardListItem>
      <CardListItem title="새 소유자">
        <UserProfile {...destUser} />
      </CardListItem>
      <CardListItem title="기존 소유자">
        <UserProfile {...originUser} />
      </CardListItem>
      <CardListItem title="교환일시">
        <p className="description">{getFormattedTime(loggedTime)}</p>
      </CardListItem>
    </HistorySection>
  );
}

export default History;
