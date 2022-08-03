import React, { useState, useCallback } from 'react';
import { BACKEND } from '@util/commonAPI';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import * as photoAPI from '@api/photoAPI';
import Card from '@component/card/basic/Card';
import CardBody from '@component/card/basic/CardBody';
import Button from '@component/form/Button';

interface PhotoInfoProps {
  photo: typeof photoAPI.getPhotoDetail.resType;
  startEditor: () => void;
  children?: React.ReactNode;
}
const PhotoInfoDefaultProps = {};

function PhotoInfo({ photo, startEditor, children }: PhotoInfoProps & typeof PhotoInfoDefaultProps) {
  return (
    <Card className="PhotoInfo" width="100%" marginBottom="5em">
      <CardBody>
        <section className="photo-section">

          <img
            width="150" height="224"
            src={`${BACKEND}/image/photo/${photo?.image_name}`}
            alt="이미지"
          />

          <section className="description-section">
            <section className="photo-name-section">
              <p className="photo-name">{photo?.name}</p>
            </section>

            <section className="label-section">
              <p className="member-name">{photo?.member_name}</p>
              <p>그룹: <span className="group-name">{photo?.group_name}</span></p>
            </section>

            <Button
              rightIcon={faPenToSquare}
              styles={{
                width: "fit-content",
                theme: "primary-outlined",
                marginTop: "1em",
                padding: "0.7em 1.3em",
                iconMargin: "1em"
              }}
              onClick={startEditor}
            >수정</Button>
          </section>

        </section>
      </CardBody>
    </Card>
  );
}

PhotoInfo.defaultProps = PhotoInfoDefaultProps;
export default PhotoInfo;