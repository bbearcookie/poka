import { useReducer, useCallback } from 'react';
import useAddTrade from '@api/mutation/trade/useAddTrade';
import { useNavigate } from 'react-router';
import { reducer, initialState, FormType } from '@component/trade/editor/reducer';
import TitleLabel from '@component/label/titleLabel/TitleLabel';
import Voucher from '@component/trade/editor/Voucher';
import WantPhotocard from '@component/trade/editor/WantPhotocard';
import ButtonSection from '@component/trade/editor/ButtonSection';
import { StyledIndex } from './_styles';

function Index() {
  const [state, dispatch] = useReducer(reducer, initialState);
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
      <TitleLabel title="교환 등록하기" styles={{ marginBottom: '2em' }} />
      <div className="voucher-section">
        <Voucher state={state} dispatch={dispatch} />
      </div>
      <div className="wantcard-section">
        <WantPhotocard state={state} dispatch={dispatch} />
      </div>
      <ButtonSection handleSubmit={handleSubmit} handleCancel={handleCancel} />
    </StyledIndex>
  );
}

export default Index;
