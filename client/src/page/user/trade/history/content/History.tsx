import React from 'react';
import CardListItem from '@component/card/basic/CardListItem';
import SkeletonPhotoInfo from '@component/photocard/new/info/SkeletonPhotoInfo';
import PhotoInfo from '@component/photocard/new/info/PhotoInfo';
import UserProfile from '@component/profile/UserProfile';
import { getFormattedTime } from '@util/date';
import { Photo } from '@type/photo';

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
    <>
      <CardListItem title="포토카드" styles={{ borderBottom: 'none' }}>
        <PhotoInfo {...photo} imgStyles={{ size: 0.7 }} />
      </CardListItem>
      <CardListItem title="새 소유자" styles={{ borderBottom: 'none' }}>
        <UserProfile {...destUser} />
      </CardListItem>
      <CardListItem title="기존 소유자" styles={{ borderBottom: 'none' }}>
        <UserProfile {...originUser} />
      </CardListItem>
      <CardListItem title="교환일시">
        <p className="description">{getFormattedTime(loggedTime)}</p>
      </CardListItem>
    </>
  );
}

export default History;
