import { useReducer, useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import useTradeQuery from '@api/query/trade/useTradeQuery';
import useModifyTrade from '@api/mutation/trade/useModifyTrade';
import { useNavigate } from 'react-router';
import { reducer, initialState, FormType } from '@component/trade/editor/reducer';
import TitleLabel from '@component/label/titleLabel/TitleLabel';
import Voucher from '@component/trade/editor/Voucher';
import WantPhotocard from '@component/trade/editor/WantPhotocard';
import ButtonSection from '@component/trade/editor/ButtonSection';
import { StyledIndex } from './_styles';
import ErrorCard from '@component/card/ErrorCard';

function Index() {
  const tradeId = Number(useParams().tradeId) || 0;
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const { data: trade, status, fetchStatus, error } = useTradeQuery(tradeId);

  // 기본 상태 값 설정
  useEffect(() => {
    if (!trade) return;
    dispatch({
      type: 'SET_DATA',
      payload: {
        voucherId: trade.voucher.voucherId,
        wantPhotocardIds: trade.wantcards.map(e => e.photocardId),
        amount: trade.amount,
      },
    });
  }, [trade]);

  // 수정 요청
  const putMutation = useModifyTrade<keyof FormType>(
    tradeId,
    res => navigate(`/trade/detail/${tradeId}`),
    err => {
      err.response?.data.errors.forEach(item => {
        dispatch({ type: 'SET_MESSAGE', target: item.param, value: item.message });
      });
    }
  );

  // 취소 버튼 클릭시
  const handleCancel = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  // 전송 버튼 클릭시
  const handleSubmit = useCallback(() => {
    putMutation.mutate({ ...state.data });
  }, [state, putMutation]);

  // tradeId 의 값이 0이어서 useTradeQuery의 enabled가 false일 때 출력
  if (status === 'loading' && fetchStatus === 'idle')
    return (
      <StyledIndex>
        <ErrorCard error="존재하지 않는 교환이에요." />
      </StyledIndex>
    );

  // 에러 발생 출력
  if (status === 'error')
    return (
      <StyledIndex>
        <ErrorCard error={error} />
      </StyledIndex>
    );

  // 로딩 출력
  if (status === 'loading') return <StyledIndex></StyledIndex>;

  // 데이터 성공 출력
  if (status === 'success')
    return (
      <StyledIndex>
        <TitleLabel title="교환 수정" styles={{ marginBottom: '2em' }} />
        <Voucher
          ableToChange={false}
          state={state}
          dispatch={dispatch}
          cssProp={{ width: 'fit-content', marginBottom: '5em' }}
        />
        <WantPhotocard state={state} dispatch={dispatch} cssProp={{ marginBottom: '5em' }} />
        <ButtonSection handleSubmit={handleSubmit} handleCancel={handleCancel} />
      </StyledIndex>
    );

  return <></>;
}

export default Index;
