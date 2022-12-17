import React from 'react';
import styled from 'styled-components';
import { photoImage } from '@api/resource';
import { PhotoType } from '@type/photo';
import Card from '@component/card/basic/Card';
import CardBody from '@component/card/basic/CardBody';
import CardFooter from '@component/card/basic/CardFooter';
import { StylesProps } from '@component/card/basic/Card';

interface Props {
  photo: PhotoType;
  className?: string;
  iconNode?: React.ReactNode;
  cardStyles?: StylesProps;
  children?: React.ReactNode;
}
const DefaultProps = {};

function PhotoCardTemplate({ className, photo, iconNode, cardStyles, children }: Props) {
  return (
    <Card
      className={className}
      styles={{
        width: "calc(150px + 3em)",
        boxShadow: "0px 0px 10px 0px #C0C0C0",
        ...cardStyles
      }}
    >
      <CardBody>
        <img
          width="150" height="224"
          src={photoImage(photo.image_name)}
          alt="이미지" />
        <PhotoNameDiv><p>{photo.name}</p></PhotoNameDiv>

        <ContentSection>
          <NameSection>
            <MemberNameLabel>{photo.member_name}</MemberNameLabel>
            <GroupNameLabel>{photo.group_name}</GroupNameLabel>
          </NameSection>

          <IconSection>
            {iconNode && iconNode}
          </IconSection>
        </ContentSection>

      </CardBody>
      {children && <CardFooter>{children}</CardFooter>}
    </Card>
  );
}

export default PhotoCardTemplate;

export const PhotoNameDiv = styled.div`
  margin-top: 1em;
  padding: 0 0.5em;
  width: 100%;
  height: 3.5em;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #242A38;
  color: white;
  border-radius: 5px;

  p {
    margin: 0;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    display: -webkit-box;
    word-break: keep-all;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`

export const ContentSection = styled.section`
  width: 100%;
  display: flex;
`

export const NameSection = styled.section`
  width: 80%;
  margin-top: 1em;
  flex-grow: 1;
`

const IconSection = styled.section`
  align-self: flex-end;
  cursor: pointer;

  a {
    color: inherit;
  }
`

const MemberNameLabel = styled.p`
  width: 100%;
  margin: 0;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const GroupNameLabel = styled.p`
  width: fit-content;
  max-width: 80%;
  margin: 0.5em 0 0 0;
  padding: 0 0.4em;
  background-color: #E5E7EB;
  border-radius: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`