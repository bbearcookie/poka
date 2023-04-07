import React, { useCallback } from 'react';
import Input from '@component/form/Input';
import { InputMessage } from '@component/form/_styles';
import { Card, CardBody } from '@component/card/basic/_styles';
import Button from '@component/form/Button';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { State, Action } from '../reducer';
import { StyledPhotoInfo } from './_styles';

interface Props {
  idx: number;
  src: string;
  message: string;
  state: State;
  dispatch: React.Dispatch<Action>;
}

function PhotoInfo({ idx, src, message, state, dispatch }: Props) {
  // 추가하려는 포토카드에서 제거
  const handleRemove = useCallback(() => {
    dispatch({ type: 'REMOVE_PHOTO', idx });
  }, [idx, dispatch]);

  // input 변경시 이름 변경
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'SET_PHOTO_NAME', idx, name: e.target.value });
    },
    [idx, dispatch]
  );

  // 포커스 해제시 내용 비어있는지 확인후 오류 메시지 설정
  const onBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (e.target.value) dispatch({ type: 'SET_PHOTO_MESSAGE', idx, message: '' });
      else dispatch({ type: 'SET_PHOTO_MESSAGE', idx, message: '포토카드 이름이 비어있어요.' });
    },
    [idx, dispatch]
  );

  return (
    <StyledPhotoInfo>
      <Card>
        <CardBody>
          <img width="215" height="320" src={src} alt="포토카드" />

          <section className="name-section">
            <Input
              type="text"
              name="name"
              placeholder="포토카드 이름"
              autoComplete="off"
              maxLength={100}
              onChange={onChange}
              onBlur={onBlur}
              styles={{
                height: '2.5em',
                textAlign: 'center',
                color: 'white',
                placeholderColor: 'gray',
                backgroundColor: '#242A38',
                border: '1px solid #242A38',
                activeBorder: '1px solid #adafb5',
                activeBoxShadow: '0px 0px 1px 1px #adafb5',
              }}
            >
              {message && (
                <InputMessage
                  css={{
                    width: '200px',
                    margin: '1em 0 0 0',
                    textAlign: 'center',
                    wordBreak: 'keep-all',
                  }}
                >
                  {message}
                </InputMessage>
              )}
            </Input>
          </section>

          <Button
            leftIcon={faTrashCan}
            onClick={handleRemove}
            buttonTheme="danger-outlined"
            css={{
              width: '5em',
              padding: '0.5em 0',
              marginTop: '1em',
            }}
          >
            취소
          </Button>
        </CardBody>
      </Card>
    </StyledPhotoInfo>
  );
}

export default PhotoInfo;
