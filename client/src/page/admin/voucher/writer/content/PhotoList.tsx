import React, { Fragment, useCallback } from 'react';
import { useQueries } from '@tanstack/react-query';
import { useAppSelector, useAppDispatch } from '@app/redux/reduxHooks';
import { PhotoType } from '@api/photoAPI';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import * as photoAPI from '@api/photoAPI';
import * as queryKey from '@api/queryKey';
import Input from '@component/form/Input';
import InputMessage from '@component/form/InputMessage';
import PhotoCard from '@component/photocard/PhotoCard';
import SkeletonPhotoCard from '@component/photocard/skeleton/SkeletonPhotoCard';
import { changeVoucherAmount, removeVoucher, setVoucherMessage } from '../voucherWriterSlice';

interface Props {}
const DefaultProps = {};

function PhotoList({  }: Props) {
  const { vouchers } = useAppSelector((state) => state.voucherWriter);
  const dispatch = useAppDispatch();

  const photos = useQueries({
    queries: vouchers.value.map((element) => ({
      queryKey: queryKey.groupKeys.detail(element.photocardId),
      queryFn: async () => {
        const data = await photoAPI.getPhotoDetail.axios(element.photocardId);
        return { ...data, id: element.id };
      }
    }))
  });

  // 수량 input 변경시 상태 값 반영
  const changeAmountInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(e.target.name);
    const amount = Number(e.target.value);
    if (isNaN(id) || isNaN(amount)) return;
    dispatch(changeVoucherAmount({id, amount}));
  }, [dispatch]);

  return (
    <section className="PhotoList">
      {photos.map((photo, idx) => (
        <Fragment key={idx}>
          {photo.data ? 
          <PhotoCard
            photo={photo.data as PhotoType}
            icon={faClose}
            handleClickIcon={() => dispatch(removeVoucher(photo.data.id))}
          >
            <b>수량</b>
            <Input
              name={String(photo.data.id)}
              type="text"
              value={vouchers.value[idx].amount}
              maxLength={2}
              onChange={changeAmountInput}
              onBlur={(e) => dispatch(setVoucherMessage({ idx, message: '' }))}
              styles={{
                width: '100%',
                height: '2em',
                marginTop: '0.5em'
              }}
            >
              <InputMessage styles={{ margin: '1em 0 0 0' }}>{vouchers.value[idx].message}</InputMessage>
            </Input>
          </PhotoCard> :
          <SkeletonPhotoCard />}
        </Fragment>
      ))}
    </section>
  );
}

export default PhotoList;