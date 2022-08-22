import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BACKEND } from '@util/commonAPI';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Card from '@component/card/basic/Card';
import CardBody from '@component/card/basic/CardBody';
import IconButton from '@component/form/IconButton';

export const CLASS = 'PhotoCard';
interface PhotoCardProps {
  photo: {
    photocard_id: number;
    member_id: number;
    group_id: number;
    name: string;
    group_name: string;
    member_name: string;
    image_name: string;
  }
  styles?: StylesProps,
  children?: React.ReactNode;
}
const PhotoCardDefaultProps = {};

function PhotoCard(p: PhotoCardProps & typeof PhotoCardDefaultProps) {
  return (
    <StyledPhotoCard {...StylesDefaultProps} {...p.styles} className={CLASS}>
      <Card boxShadow="0px 0px 10px 0px #C0C0C0">
        <CardBody>
          <img
            width="150" height="224"
            src={`${BACKEND}/image/photo/${p.photo.image_name}`}
            alt="이미지" />
          <div className={`${CLASS}__photocard-name`}><p>{p.photo.name}</p></div>
          <section className={`${CLASS}__content-section`}>
            <section className={`${CLASS}__name-section`}>
              <p className={`${CLASS}__member-name`}>{p.photo.member_name}</p>
              <p className={`${CLASS}__group-name`}>{p.photo.group_name}</p>
            </section>
            <section className={`${CLASS}__icon-section`}>
              <Link to={`/admin/photo/detail/${p.photo.photocard_id}`}>
                <IconButton icon={faArrowRight} size="lg"/>
              </Link>
            </section>
          </section>
        </CardBody>
      </Card>
    </StyledPhotoCard>
  );
}

PhotoCard.defaultProps = PhotoCardDefaultProps;
export default PhotoCard;

// 스타일 컴포넌트
interface StylesProps {}
const StylesDefaultProps = {};
export const StyledPhotoCard = styled.div<StylesProps & typeof StylesDefaultProps>`
  width: calc(150px + 3em);

  .${CLASS}__photocard-name {
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
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }

  .${CLASS}__content-section {
    width: 100%;
    display: flex;

    .${CLASS}__name-section {
      width: 80%;
      margin-top: 1em;
      flex-grow: 1;

      .${CLASS}__member-name {
        width: 100%;
        margin: 0;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .${CLASS}__group-name {
        width: fit-content;
        max-width: 80%;
        margin: 0.5em 0 0 0;
        padding: 0 0.4em;
        background-color: #E5E7EB;
        border-radius: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .${CLASS}__icon-section {
      align-self: flex-end;
      cursor: pointer;

      a {
        color: inherit;
      }
    }
  }
`;