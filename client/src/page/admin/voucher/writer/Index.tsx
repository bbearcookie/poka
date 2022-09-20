import React, { useEffect, useCallback } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useAppSelector, useAppDispatch } from '@app/reduxHooks';
import { initialize, setMessage, setVoucherMessage } from './voucherWriterSlice';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorType } from '@util/commonAPI';
import * as voucherAPI from '@api/voucherAPI';
import UsernameSection from './content/UsernameSection';
import VoucherSection from './content/VoucherSection';
import SubmitSection from './content/SubmitSection';
import './Index.scss';

interface IndexProps {
  children?: React.ReactNode;
}
const IndexDefaultProps = {};

function Index({ children }: IndexProps & typeof IndexDefaultProps) {
  const form = useAppSelector((state) => state.voucherWriter);
  const dispatch = useAppDispatch();

  // 소유권 발급 요청
  const postMutation = useMutation(voucherAPI.postVoucher.axios, {
    onSuccess: (res: AxiosResponse<typeof voucherAPI.postVoucher.resType>) => {

    },
    onError: (err: AxiosError<ErrorType>) => {
      if (err.response?.data.message) toast.error(err.response?.data.message, { autoClose: 5000, position: toast.POSITION.BOTTOM_RIGHT });
      else toast.error(err.message, { autoClose: 5000, position: toast.POSITION.BOTTOM_RIGHT });

      // 유효성 검증 결과 메시지 설정
      err.response?.data.errors.forEach((item) => {
        if (item.param === 'username')
          dispatch(setMessage({ type: 'username', message: item.message }));

        if (item.param === 'vouchers')
          dispatch(setMessage({ type: 'vouchers', message: item.message }));

          if (item.param.substring(0, 8) === 'vouchers') {
            const pattern = /vouchers\[([\d]+)\]/g;
            const index = Number(pattern.exec(item.param)?.at(1));
            dispatch(setVoucherMessage({idx: index, message: item.message}));
            console.log(index);
          }
      });
    }
  });

  // 첫 렌더시 상태 값 초기화
  useEffect(() => {
    dispatch(initialize());
  }, [dispatch]);

  // 폼 전송 이벤트
  const onSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    postMutation.mutate({
      data: {
        username: form.username.value,
        vouchers: form.vouchers.value.map((item) => ({ photocardId: item.photocardId, amount: item.amount }))
      }
    });
  }, [form, postMutation]);

  return (
    <div className="VoucherWriterPage">
      <h1>소유권 발급</h1>
      <form onSubmit={onSubmit}>
        <UsernameSection />
        <VoucherSection />
        <SubmitSection />
      </form>
    </div>
  );
}

Index.defaultProps = IndexDefaultProps;
export default Index;