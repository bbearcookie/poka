import React, { useReducer, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useAddVouchers from '@api/mutation/voucher/useAddVouchers';
import UsernameSection from './content/UsernameSection';
import VoucherSection from './content/VoucherSection';
import SubmitSection from './content/SubmitSection';
import reducer, { initialState } from './reducer';
import './Index.scss';

interface Props {}
const DefaultProps = {};

function Index({  }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  // 소유권 발급 요청
  const postMutation = useAddVouchers<string>(
    (res) => navigate('/admin/voucher/list'),
    (err) => {
      err.response?.data.errors.forEach(item => {
        if (item.param === 'username' || item.param === 'vouchers') {
          dispatch({ type: 'SET_MESSAGE', target: item.param, value: item.message });
        }
        else if (item.param.substring(0, 8) === 'vouchers') {
          const pattern = /vouchers\[([\d]+)\]/g;
          const index = Number(pattern.exec(item.param)?.at(1));
          dispatch({ type: 'SET_VOUCHER_MESSAGE', id: state.form.vouchers[index].id, value: item.message });
        }
      });
    }
  );

  // 폼 전송 이벤트
  const onSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'CLEAR_MESSAGE' });

    postMutation.mutate({
      body: {
        username: state.form.username,
        vouchers: state.form.vouchers.map(item => ({ photocardId: item.photocardId, amount: item.amount }))
      }
    });
  }, [state, postMutation]);

  return (
    <div className="VoucherWriterPage">
      <h1 className="title-label">소유권 발급</h1>
      <form onSubmit={onSubmit}>
        <UsernameSection state={state} dispatch={dispatch} />
        <VoucherSection state={state} dispatch={dispatch} />
        <SubmitSection />
      </form>
    </div>
  );
}

export default Index;