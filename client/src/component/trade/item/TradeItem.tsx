import React from 'react';
import { PhotoImg } from '@component/photocard/item/_styles';
import PhotoInfo from '@component/photocard/newinfo/PhotoInfo';
import StateLabel from '@component/label/stateLabel/StateLabel';
import UserProfile from '@component/profile/UserProfile';
import { Photo } from '@type/photo';
import { getElaspedTime } from '@util/date';
import { TradeStateKey } from '@component/label/stateLabel/_types';
import { User } from '@type/user';
import { StyledTradeItem, PhotoSection, InfoSection } from './_styles';
import { photoImage } from '@api/resource';

interface Props {
  photo: Photo;
  author: User;
  writtenTime: string;
  tradeState: TradeStateKey;
  to?: string;
}

function TradeItem({ photo, author, writtenTime, tradeState, to = '#' }: Props) {
  return (
    <StyledTradeItem to={to}>
      <PhotoSection>
        <PhotoInfo
          {...photo}
          styles={{
            boxShadow: '0',
            border: '1px solid #e5e7eb',
            backgroundColor: 'rgb(248, 248, 248)',
          }}
        >
          <StateLabel state={{ type: 'trade', key: tradeState }} />
          <p className="written-time">{getElaspedTime(new Date(writtenTime))}</p>
        </PhotoInfo>
      </PhotoSection>

      <InfoSection>
        <section className="want-section">
          <p className="want-label">
            <b>아래 카드 중에서 1장이랑 교환 원해요!</b>
          </p>
          <section className="images">
            <PhotoImg width="5em" src={photoImage('39_1659339397868.png')} alt="이미지" />
            <PhotoImg width="5em" src={photoImage('39_1659339397868.png')} alt="이미지" />
            <PhotoImg width="5em" src={photoImage('39_1659339397868.png')} alt="이미지" />
            <PhotoImg width="5em" src={photoImage('39_1659339397868.png')} alt="이미지" />
            <PhotoImg width="5em" src={photoImage('39_1659339397868.png')} alt="이미지" />
            <PhotoImg width="5em" src={photoImage('39_1659339397868.png')} alt="이미지" />
            <PhotoImg width="5em" src={photoImage('39_1659339397868.png')} alt="이미지" />
            <PhotoImg width="5em" src={photoImage('39_1659339397868.png')} alt="이미지" />
            <PhotoImg width="5em" src={photoImage('39_1659339397868.png')} alt="이미지" />
            <PhotoImg width="5em" src={photoImage('39_1659339397868.png')} alt="이미지" />
          </section>
        </section>

        <section className="author-section">
          <h4 className="author-label">등록한 사람</h4>
          <UserProfile {...author} />
        </section>
      </InfoSection>
    </StyledTradeItem>
  );
}

export default TradeItem;
