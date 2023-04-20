import { useReducer, useCallback } from 'react';
import produce from 'immer';
import QueryString from 'qs';
import { useLocation, useNavigate } from 'react-router';
import useAddTrade from '@api/mutation/trade/useAddTrade';
import { reducer, initialState, FormType } from '@component/trade/editor/reducer';
import TitleLabel from '@component/label/TitleLabel';
import Voucher from '@component/trade/editor/Voucher';
import WantPhotocard from '@component/trade/editor/WantPhotocard';
import ButtonSection from '@component/trade/editor/ButtonSection';
import { StyledIndex } from './_styles';

function Index() {
  const location = useLocation();
  const voucherId = Number(QueryString.parse(location.search, { ignoreQueryPrefix: true }).voucherId) || 0;
  const [state, dispatch] = useReducer(
    reducer,
    produce(initialState, draft => {
      draft.data.voucherId = voucherId;
    })
  );
  const navigate = useNavigate();

  const postMutation = useAddTrade<keyof FormType>(
    res => navigate('/trade/mine'),
    err => {
      err.response?.data.errors.forEach(item => {
        dispatch({ type: 'SET_MESSAGE', target: item.param, value: item.message });
      });
    }
  );

  const handleCancel = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleSubmit = useCallback(() => {
    postMutation.mutate({ ...state.data });
  }, [state, postMutation]);

  return (
    <StyledIndex>
      <TitleLabel title="교환 등록" css={{ marginBottom: '2em' }} />
      <Voucher state={state} dispatch={dispatch} cssProp={{ width: 'fit-content', marginBottom: '5em' }} />
      <WantPhotocard state={state} dispatch={dispatch} cssProp={{ marginBottom: '5em' }} />
      <ButtonSection handleSubmit={handleSubmit} handleCancel={handleCancel} />
    </StyledIndex>
  );
}

export default Index;
