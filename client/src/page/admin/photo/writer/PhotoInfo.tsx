import React, { useCallback } from 'react';
import Input from '@component/form/Input';
import InputMessage from '@component/form/InputMessage';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import Button from '@component/form/Button';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

interface PhotoInfoProps {
  idx: number;
  src: string;
  message: string;
  changePhotoName: (idx: number, value: string) => void;
  removePhoto: (idx: number) => void;
  setPhotoMessage: (idx: number, message: string) => void;
  children?: React.ReactNode;
}
const PhotoInfoDefaultProps = {};

function PhotoInfo({ idx, src, message, changePhotoName, removePhoto, setPhotoMessage, children }: PhotoInfoProps & typeof PhotoInfoDefaultProps) {
  return (
    <Card className="PhotoInfoCard" margin="0 1em 2em 1em">
      <CardBody>
        <img width="215" height="320" src={src} alt="포토카드" />
        <section className="name-section">
          <Input
            type="text"
            name="name"
            height="2.5em"
            placeholder="포토카드 이름"
            autoComplete='off'
            textAlign="center"
            color="white"
            placeholderColor="gray"
            backgroundColor="#242A38"
            border="1px solid #242A38"
            activeBorder="1px solid #adafb5"
            activeBoxShadow="0px 0px 1px 1px #adafb5"
            onChange={(e) => changePhotoName(idx, e.target.value)}
            onBlur={(e) => e.target.value 
              ? setPhotoMessage(idx, "")
              : setPhotoMessage(idx, "포토카드 이름이 비어있어요.")
            }
          >
            {message &&
              <InputMessage
                width="200px"
                margin="1em 0 0 0"
                textAlign="center"
                wordBreak="keep-all"
              >{message}</InputMessage>}
          </Input>
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