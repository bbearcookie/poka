import React, { Fragment, useCallback } from 'react';
import { useQueries } from 'react-query';
import { useAppSelector, useAppDispatch } from '@app/reduxHooks';
import { PhotoType } from '@component/photo-list/basic/PhotoCard';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import * as photoAPI from '@api/photoAPI';
import * as queryKey from '@util/queryKey';
import Input from '@component/form/Input';
import PhotoCard from '@component/photo-list/basic/PhotoCard';
import SkeletonPhotoCard from '@component/photo-list/basic/SkeletonPhotoCard';
import { changeVoucherAmount, removeVoucher } from '../voucherWriterSlice';

interface PhotoListProps {
  children?: React.ReactNode;
}
const PhotoListDefaultProps = {};

function PhotoList({ children }: PhotoListProps & typeof PhotoListDefaultProps) {
  const { vouchers } = useAppSelector((state) => state.voucherWriter);
  const photos = useQueries(vouchers.map((element) => ({
    queryKey: queryKey.groupKeys.detail(element.photocardId),
    queryFn: async () => {
      const data = await photoAPI.getPhotoDetail.axios(element.photocardId);
      return { ...data, id: element.id };
    }
  })));
  const dispatch = useAppDispatch();

  // 수량 input 변경시 상태 값 반영
  const changeAmountInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(e.target.name);
    const amount = Number(e.target.value);
    if (isNaN(id) || isNaN(amount)) return;
    dispatch(changeVoucherAmount({id, amount}));
  }, [dispatch]);

  return (
    <section className="PhotoList">
      {photos.map((element, idx) => (
        <Fragment key={idx}>
          {element.data ? 
          <PhotoCard
            photo={element.data as PhotoType}
            icon={faClose}
            handleClickIcon={() => dispatch(removeVoucher(element.data.id))}
          >
            <b>수량</b>
            <Input
              name={String(element.data.id)}
              type="text"
              value={vouchers.find((voucher) => voucher.id === element.data.id)?.amount}
              maxLength={4}
              onChange={changeAmountInput}
              styles={{
                width: '100%',
                height: '2em',
                marginTop: '0.5em'
              }}
            />
          </PhotoCard> :
          <SkeletonPhotoCard />}
        </Fragment>
      ))}

    </section>
  );
}

PhotoList.defaultProps = PhotoListDefaultProps;
export default PhotoList;