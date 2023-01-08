import React from 'react';
import styled from 'styled-components';
import { photoImage } from '@api/resource';
import { PhotoType } from '@type/photo';
import Card, { StylesProps as CardStyles } from '@component/card/basic/Card';
import CardBody from '@component/card/basic/CardBody';

interface Props {
  photo: PhotoType;
  cardStyles?: CardStyles;
  children?: React.ReactNode;
}
const DefaultProps = {};

function PhotoInfoCard({ photo, cardStyles, children }: Props) {
  return (
    <Card
      className="PhotoInfoCard"
      styles={{
        width: "fit-content",
        margin: "0 auto 5em auto",
        textAlign: "center",
        ...cardStyles
      }}
    >
      <CardBody>
        <PhotoSection>
          <img
            width="150" height="224"
            src={photoImage(photo.image_name)}
            alt="이미지"
          />
          <PhotoNameLabel>{photo.name}</PhotoNameLabel>
          <MemberNameLabel>{photo.member_name}</MemberNameLabel>
          <GroupNameLabel>그룹: <GroupName>{photo.group_name}</GroupName></GroupNameLabel>

          {children}
        </PhotoSection>
      </CardBody>
    </Card>
  );
}

export default PhotoInfoCard;

const PhotoSection = styled.section`
  display: flex;
  flex-direction: column;

  img { margin: 0 auto; }
`

const PhotoNameLabel = styled.p`
  margin: 1.5em 0 0 0;
  padding: 1em;
  width: 8em;
  color: white;
  background-color: #242A38;
  border-radius: 5px;
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