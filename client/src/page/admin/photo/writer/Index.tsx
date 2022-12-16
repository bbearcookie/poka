import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorType, getErrorMessage } from '@util/request';
import * as photoAPI from '@api/photoAPI';
import * as queryKey from '@api/queryKey';
import Button from '@component/form/Button';
import SelectCard from './SelectCard';
import Upload from './Upload';
import PhotoList from './PhotoList';
import './Index.scss';

export interface PhotoType {
  idx: number;
  name: string;
  message: string; // 유효성 검사 에러 메시지
  imageFile: File;
  previewURL: string | ArrayBuffer | null;
};

export interface SelectType {
  groupId: number;
  memberId: number;
}

interface Props {}
const DefaultProps = {};

function PhotoWriterPage({  }: Props) {
  const [photoList, setPhotoList] = useState<PhotoType[]>([]);
  const [select, setSelect] = useState<SelectType>({
    groupId: 0,
    memberId: 0
  });
  const [selectMessage, setSelectMessage] = useState<{
    [k in keyof SelectType]: string;
  }>({
    groupId: '',
    memberId: ''
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 데이터 추가 요청
  const postMutation = useMutation(photoAPI.postPhotos.axios, {
    onSuccess: (res: AxiosResponse<typeof photoAPI.postPhotos.resType>) => {
      console.log(res.data);
      toast.success(res.data?.message, { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
      queryClient.invalidateQueries(queryKey.photoKeys.all);
      return navigate('/admin/photo/list');
      
    },
    onError: (err: AxiosError<ErrorType>) => {
      toast.error(getErrorMessage(err), { autoClose: 5000, position: toast.POSITION.BOTTOM_RIGHT });

      // 유효성 검증 결과 메시지 설정
      if (err.response?.data?.errors) {

        // 기존 메시지 초기화
        const photos = photoList.map((item) => ({ ...item, message: '' }) );
        let messages = { groupId: '', memberId: '' };

        // 오류 메시지 처리
        err.response?.data?.errors.forEach((item) => {
          if (item.param === 'groupId')
            messages = { ...messages, groupId: item.message };

          if (item.param === 'memberId')
            messages = { ...messages, memberId: item.message };
            
          if (item.param.substring(0, 4) === 'name') {
            const pattern = /name\[([\d]+)\]/g;
            const index = Number(pattern.exec(item.param)?.at(1));
            photos[index] = { ...photos[index], message: item.message };
          }
        });

        setPhotoList(photos);
        setSelectMessage(messages);
      }
    }
  })

  // 전송시 작동
  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('groupId', select.groupId.toString());
    formData.set('memberId', select.memberId.toString());
    photoList.forEach((item) => {
      formData.append('name[]', item.name);
      formData.append('image[]', item.imageFile);
    });
    postMutation.mutate({data: formData});

  }, [select, photoList, postMutation]);

  return (
    <div className="PhotoWriterPage">
      <h1 className="title-label">포토카드 등록</h1>
      <form onSubmit={onSubmit}>
        <section className="info-section">
          <SelectCard
            select={select}
            setSelect={setSelect}
            selectMessage={selectMessage}
            setSelectMessage={setSelectMessage}
          />
          <Upload photoList={photoList} setPhotoList={setPhotoList} />
        </section>
        <PhotoList photoList={photoList} setPhotoList={setPhotoList} />
        <section className="button-section">
          <Button
            styles={{
              theme: "primary-outlined",
              padding: "1em 2em",
              marginLeft: "1em"
            }}
            onClick={() => navigate('/admin/photo/list')}
          >취소</Button>
          <Button
            type="submit"
            styles={{
              theme: "primary",
              padding: "1em 2em",
              marginLeft: "1em"
            }}
          >작성</Button>
        </section>
      </form>
    </div>
  );
}

export default PhotoWriterPage;