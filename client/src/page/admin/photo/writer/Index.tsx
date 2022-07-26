import React, { useState, useCallback } from 'react';
import Button from '@component/form/Button';
import SelectCard from './SelectCard';
import Upload from './Upload';
import PhotoList from './PhotoList';
import './Index.scss';

interface PhotoWriterPageProps {
  children?: React.ReactNode;
}
const PhotoWriterPageDefaultProps = {};

export interface PhotoType {
  idx: number;
  name: string;
  imageFile: File;
  previewURL: string | ArrayBuffer | null;
};

export interface SelectType {
  group: number;
  member: number;
}

function PhotoWriterPage({ children }: PhotoWriterPageProps & typeof PhotoWriterPageDefaultProps) {
  const [photoList, setPhotoList] = useState<PhotoType[]>([]);
  const [select, setSelect] = useState<SelectType>({
    group: 0,
    member: 0
  });

  // 전송시 작동
  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    console.log(photoList);
    console.log(select);
  }, [photoList, select]);

  return (
    <div className="PhotoWriterPage">
      <h1 className="title-label">포토카드 등록</h1>
      <form onSubmit={onSubmit}>
        <section className="info-section">
          <SelectCard select={select} setSelect={setSelect} />
          <Upload photoList={photoList} setPhotoList={setPhotoList} />
        </section>
        <PhotoList photoList={photoList} setPhotoList={setPhotoList} />
        <section className="button-section">
          <Button theme="primary-outlined" padding="1em 2em" marginLeft="1em">취소</Button>
          <Button theme="primary" type="submit" padding="1em 2em" marginLeft="1em">작성</Button>
        </section>
      </form>
    </div>
  );
}

PhotoWriterPage.defaultProps = PhotoWriterPageDefaultProps;
export default PhotoWriterPage;