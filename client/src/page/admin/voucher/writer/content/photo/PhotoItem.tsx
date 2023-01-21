import React, { useCallback } from 'react';
import { ResType as PhotoResType } from '@api/query/photo/usePhotoQuery';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import Input from '@component/form/Input';
import InputMessage from '@component/form/InputMessage';
import PhotoCard from '@component/photocard/photo/PhotoCard';
import { State, Action } from '../../reducer';

export interface PhotoItemType extends PhotoResType {
  id: number;
}

interface Props {
  photo: PhotoItemType;
  idx: number;
  state: State;
  dispatch: React.Dispatch<Action>;
}
const DefaultProps = {};

function PhotoItem({ photo, idx, state, dispatch }: Props) {

  // 수량 input 변경시 상태 값 반영
  const changeAmountInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(e.target.name);
    const amount = Number(e.target.value);
    if (isNaN(id) || isNaN(amount)) return;
    dispatch({ type: 'SET_VOUCHER_AMOUNT', id, amount });
  }, [dispatch]);

  const handleRemove = useCallback(() => {
    dispatch({ type: 'REMOVE_VOUCHER', id: photo.id })
  }, [photo, dispatch]);

  const onBlur = useCallback(() => {
    dispatch({ type: 'SET_VOUCHER_MESSAGE', id: photo.id, value: '' })
  }, [photo, dispatch]);

  return (
    <PhotoCard
      photocardId={photo.photocard_id}
      photoName={photo.name}
      groupName={photo.group_name}
      memberName={photo.member_name}
      imageName={photo.image_name}
      icon={faClose}
      handleClickIcon={handleRemove}
    >
      <b>수량</b>
      <Input
        name={String(photo.id)}
        type="text"
        value={state.form.vouchers[idx].amount}
        maxLength={1}
        onChange={changeAmountInput}
        onBlur={onBlur}
        styles={{
          width: '100%',
          height: '2em',
          marginTop: '0.5em'
        }}
      >
        <InputMessage styles={{ margin: '1em 0 0 0' }}>{state.form.vouchers[idx].message}</InputMessage>
      </Input>
    </PhotoCard>
  );
}

export default PhotoItem;