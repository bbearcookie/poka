import React, { useCallback } from 'react';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import PhotoInfo from './PhotoInfo';
import { PhotoType } from './Index';

interface PhotoListProps {
  photoList: PhotoType[];
  setPhotoList: React.Dispatch<React.SetStateAction<PhotoType[]>>;
  children?: React.ReactNode;
}
const PhotoListDefaultProps = {};

function PhotoList({ photoList, setPhotoList, children }: PhotoListProps & typeof PhotoListDefaultProps) {

  // 특정 포토카드 삭제
  const removePhoto = useCallback((idx: number) => {
    setPhotoList(photoList.filter((item) => item.idx !== idx));
  }, [photoList, setPhotoList]);

  // 포토카드 이름 변경
  const changePhotoName = useCallback((idx: number, value: string) => {
    setPhotoList(
      photoList.map((item) => item.idx === idx ? {...item, name: value } : { ...item })
    );
  }, [photoList, setPhotoList]);

  return (
    <Card marginBottom="2em">
      <CardHeader>
        <h3 className="text">등록하려는 포토카드 목록</h3>
      </CardHeader>

      <CardBody>
        <section className="photo-section">
          {photoList.map((item) => (
            <PhotoInfo
              key={item.idx}
              idx={item.idx}
              src={String(item.previewURL)}
              changePhotoName={changePhotoName}
              removePhoto={removePhoto}
            />
          ))}
        </section>
      </CardBody>

    </Card>
  );
}

PhotoList.defaultProps = PhotoListDefaultProps;
export default PhotoList;