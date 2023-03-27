import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Card from '@component/card/basic/Card';
import CardBody from '@component/card/basic/CardBody';
import IconButton from '@component/form/IconButton';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { photoImage } from '@api/resource';
import { TradeItem } from '@type/trade';
import { getElaspedTime } from '@util/date';

interface Props {
  trade: TradeItem;
}

function TradeCard({ trade }: Props) {
  const navigate = useNavigate();

  const onClickIcon = useCallback(() => {
    navigate(`/trade/detail/${trade.tradeId}`);
  }, [navigate, trade]);

  return (
    <Card
      styles={{
        width: "100%",
        boxShadow: "1px 1px 5px 0px #C0C0C0"
      }}
    >
      <CardBody>
        <Body>
          <img
            width="150" height="224"
            src={photoImage(trade.photo.imageName)}
            alt="이미지" />
          <ContentSection>
            <PhotoName>{trade.photo.name}</PhotoName>
            <MemberName>{trade.photo.memberData.name}</MemberName>
            <NameLabel className="NameLabel">{trade.photo.groupData.name}</NameLabel>
            <GrayText>{getElaspedTime(new Date(trade.writtenTime))}</GrayText>
            <Space />
            <GrayText>교환할 수 있는 멤버</GrayText>
            {/* <WantMemberSection className="WantMemberSection">
              {trade.wantMembers.map(item =>
                <NameLabel key={item.memberId} className="NameLabel">{item.name}</NameLabel>)
              }
            </WantMemberSection> */}
          </ContentSection>
          <IconSection>
            <IconButton icon={faArrowRight} size="lg" tooltip="자세히 보기" onClick={onClickIcon} />
          </IconSection>
        </Body>
      </CardBody>
    </Card>
  );
}

export default TradeCard;

export const Body = styled.div`
  display: flex;
  gap: 1em;

  @media screen and (max-width: 40rem) {
    margin-top: 2em;
    flex-direction: column;
    align-items: center;
    text-align: center;

    .NameLabel, .SkeletonItem { align-self: center; }
    .WantMemberSection {
      justify-content: center;
    }
  }
`

export const ContentSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const IconSection = styled.section`
  align-self: flex-end;
`

const PhotoName = styled.p`
  margin: 0 0 0.4em 0;
  font-size: 1.2rem;
  font-weight: bold;
`

const MemberName = styled.p`
  margin: 0 0 0.4em 0;
  font-size: 1.2rem;
`

const NameLabel = styled.span`
  width: fit-content;
  padding: 0 0.4em;
  margin: 0 0 0.4em 0;
  background-color: #E5E7EB;
  border-radius: 5px;
  word-break: keep-all;

`

const GrayText = styled.p`
  margin: 0 0 0.4em 0;
  font-size: 0.8rem;
  color: #a6a6a6;
`

const Space = styled.div`
  flex-basis: 1.25em;
  flex-grow: 1;
`

const WantMemberSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  font-size: 0.9rem;
`