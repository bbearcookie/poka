import React from 'react';
import Input from '@component/form/Input';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import Button from '@component/form/Button';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

interface PhotoInfoProps {
  idx: number;
  src: string;
  changePhotoName: (idx: number, value: string) => void;
  removePhoto: (idx: number) => void;
  children?: React.ReactNode;
}
const PhotoInfoDefaultProps = {};

function PhotoInfo({ idx, src, changePhotoName, removePhoto, children }: PhotoInfoProps & typeof PhotoInfoDefaultProps) {
  return (
    <Card className="PhotoInfoCard" margin="0 1em 2em 1em">
      <CardBody>
        <img width="215" height="320" src={src} alt="포토카드" />
        <section className="name-section">
          <Input
            type="text"
            name="name"
            width="100%"
            height="2.5em"
            placeholder="포토카드 이름"
            autoComplete='off'
            textAlign="center"
            color="white"
            placeholderColor="gray"
            backgroundColor="#242A38"
            border="1px solid #242A38"
            activeBorder="2px solid #adafb5"
            activeBoxShadow="0px 0px 1px 1px #adafb5"
            onChange={(e) => changePhotoName(idx, e.target.value)}
          />
        </section>
        <Button
          theme="danger-outlined"
          leftIcon={faTrashCan}
          width="5em"
          padding="0.5em 0"
          marginTop="1em"
          onClick={() => removePhoto(idx)}
        >취소</Button>
      </CardBody>
    </Card>
  );
}

PhotoInfo.defaultProps = PhotoInfoDefaultProps;
export default PhotoInfo;