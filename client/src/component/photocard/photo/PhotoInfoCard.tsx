import React from 'react';
import styled from 'styled-components';
import { photoImage } from '@api/resource';
import Card, { StylesProps as CardStyles } from '@component/card/basic/Card';
import { PhotoName } from '@component/photocard/PhotoCardTemplate';
import CardBody from '@component/card/basic/CardBody';

interface Props {
  groupName: string;
  photoName: string;
  memberName: string;
  imageName: string;
  cardStyles?: CardStyles;
  children?: React.ReactNode;
}
const DefaultProps = {};

function PhotoInfoCard({ groupName, photoName, memberName, imageName, cardStyles, children }: Props) {
  return (
    <Card
      className="PhotoInfoCard"
      styles={{
        width: "fit-content",
        textAlign: "center",
        boxShadow: "0px 0px 10px 0px #C0C0C0",
        ...cardStyles
      }}
    >
      <CardBody>
        <StyledWrapper>
          <img
            width="150" height="224"
            src={photoImage(imageName)}
            alt="이미지"
          />
          <InfoSection>
            <PhotoName width="9.5em"><p>{photoName}</p></PhotoName>
            <MemberNameLabel>{memberName}</MemberNameLabel>
            <GroupNameLabel>그룹: <GroupName>{groupName}</GroupName></GroupNameLabel>
            {children}
          </InfoSection>
        </StyledWrapper>
      </CardBody>
    </Card>
  );
}

export default PhotoInfoCard;

const StyledWrapper = styled.section`
  display: flex;
  gap: 1em;

  img { margin: 0 auto; }
`

const InfoSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const MemberNameLabel = styled.p`
  margin: 0.75em 0 0 0;
  font-size: 1.5rem;
  font-weight: bold;
`

const GroupNameLabel = styled.p`
  margin: 0.75em 0 0 0;
`

const GroupName = styled.span`
  padding: 0 0.4em;
  background-color: #E5E7EB;
  border-radius: 5px;
  word-break: keep-all;
`