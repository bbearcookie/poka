import React from 'react';
import styled from 'styled-components';
import { photoImage } from '@api/resource';
import Card from '@component/card/basic/Card';
import CardBody from '@component/card/basic/CardBody';
import CardFooter from '@component/card/basic/CardFooter';
import { StylesProps } from '@component/card/basic/Card';

interface Props {
  photoName: string;
  memberName: string;
  groupName: string;
  imageName: string;
  className?: string;
  iconNode?: React.ReactNode;
  cardStyles?: StylesProps;
  children?: React.ReactNode;
}
const DefaultProps = {};

function PhotoCardTemplate({ className, photoName, memberName, groupName, imageName, iconNode, cardStyles, children }: Props) {
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
          src={photoImage(imageName)}
          alt="이미지" />
        <PhotoName margin="1em 0 0 0"><p>{photoName}</p></PhotoName>

        <ContentSection>
          <NameSection>
            <MemberNameLabel>{memberName}</MemberNameLabel>
            <GroupNameLabel>{groupName}</GroupNameLabel>
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

export const PhotoName = styled.div<{ width?: string; margin?: string; }>`
  margin: ${p => p.margin};
  padding: 0 0.5em;
  width: ${p => p.width ? p.width : "100%"};
  height: 3.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #242A38;
  color: white;
  border-radius: 5px;
  box-sizing: border-box;

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