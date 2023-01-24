import React from 'react';
import CardListItem from '@component/card/basic/CardListItem';
import PhotoInfoCard from '@component/photocard/photo/PhotoInfoCard';
import UserProfile from '@component/profile/UserProfile';
import { getFormattedTime } from '@util/date';

interface Props {
  photo: {
    photoName: string;
    memberName: string;
    groupName: string;
    imageName: string;
  },
  destUser: {
    username: string;
    nickname: string;
    imageName: string;
  },
  originUser: {
    username: string;
    nickname: string;
    imageName: string;
  },
  loggedTime: Date;
}
const DefaultProps = {};

function History({ photo, destUser, originUser, loggedTime }: Props) {
  return (
    <>
      <CardListItem title="포토카드" styles={{ borderBottom: "none" }}>
        <PhotoInfoCard {...photo} />
      </CardListItem>
      <CardListItem title="새 소유자" styles={{ borderBottom: "none" }}>
        <UserProfile {...destUser} />
      </CardListItem>
      <CardListItem title="기존 소유자" styles={{ borderBottom: "none" }}>
        <UserProfile {...originUser} />
      </CardListItem>
      <CardListItem title="교환일시">
        <p className="description">{getFormattedTime(loggedTime)}</p>
      </CardListItem>
    </>
  );
}

export default History;