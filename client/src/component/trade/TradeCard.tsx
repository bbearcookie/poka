import React from 'react';
import styled from 'styled-components';
import Card from '@component/card/basic/Card';
import CardBody from '@component/card/basic/CardBody';
import IconButton from '@component/form/IconButton';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface Props {

}
const DefaultProps = {};

function TradeCard({  }: Props) {
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
            src="http://localhost:5000/image/photo/33_1659339397867.png"
            alt="이미지" />
          <ContentSection>
            <PhotoName>MAP OF THE SOUL</PhotoName>
            <MemberName>나연</MemberName>
            <NameLabel>TWICE</NameLabel>
            <GrayText>1시간 전</GrayText>
            <Space />
            <GrayText>교환할 수 있는 멤버</GrayText>
            <WantMemberSection>
              <NameLabel>조유리</NameLabel>
              <NameLabel>조유리</NameLabel>
              <NameLabel>조유리</NameLabel>
            </WantMemberSection>
          </ContentSection>
          <IconSection>
            <IconButton icon={faArrowRight} size='lg' tooltip="자세히 보기" />
          </IconSection>
        </Body>
      </CardBody>
    </Card>
  );
}

export default TradeCard;

const Body = styled.div`
  display: flex;
  gap: 1em;

  @media screen and (max-width: 40rem) {
    flex-direction: column;
  }
`

const ContentSection = styled.section`
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