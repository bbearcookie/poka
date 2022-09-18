import React, { useEffect, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@app/reduxHooks';
import { initialize } from './voucherWriterSlice';
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

  // 상태 값 초기화
  useEffect(() => {
    dispatch(initialize());
  }, [dispatch]);

  // 폼 전송 이벤트
  const onSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);

  }, [form]);

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