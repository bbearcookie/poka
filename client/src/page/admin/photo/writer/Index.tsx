import React, { useReducer, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useAddPhotos from '@api/mutation/photo/useAddPhotos';
import TitleLabel from '@component/label/TitleLabel';
import SelectCard from './content/SelectCard';
import Upload from './content/Upload';
import PhotoList from './content/PhotoList';
import ButtonSection from './content/ButtonSection';
import reducer, { initialState } from './reducer';
import { StyledIndex } from './_styles';

function Index() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  // 데이터 추가 요청
  const postMutation = useAddPhotos<string>(
    res => navigate('/admin/photo/list'),
    err => {
      err.response?.data.errors.forEach(item => {
        if (item.param === 'groupId' || item.param === 'memberId') {
          dispatch({ type: 'SET_MESSAGE', payload: { target: item.param, value: item.message } });
        } else if (item.param.substring(0, 5) === 'names') {
          const pattern = /names\[([\d]+)\]/g;
          const index = Number(pattern.exec(item.param)?.at(1));
          dispatch({ type: 'SET_PHOTO_MESSAGE', idx: index, message: item.message });
        }
      });
    }
  );

  // 전송시 작동
  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const formData = new FormData();
      formData.set('groupId', state.form.groupId.toString());
      formData.set('memberId', state.form.memberId.toString());
      state.form.photos.forEach(photo => {
        formData.append('names[]', photo.name);
        formData.append('images[]', photo.imageFile);
      });
      postMutation.mutate(formData);
    },
    [state, postMutation]
  );

  return (
    <StyledIndex>
      <TitleLabel title="포토카드 등록" css={{ marginBottom: '1em' }} />
      <form onSubmit={onSubmit}>
        <section className="info-section">
          <SelectCard state={state} dispatch={dispatch} />
          <Upload state={state} dispatch={dispatch} />
        </section>
        <PhotoList state={state} dispatch={dispatch} />
        <ButtonSection />
      </form>
    </StyledIndex>
  );
}

export default Index;
