import React, { useCallback } from 'react';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import PhotoInfo from './PhotoInfo';
import { PhotoType } from './Index';

interface Props {
  photoList: PhotoType[];
  setPhotoList: React.Dispatch<React.SetStateAction<PhotoType[]>>;
}
const DefaultProps = {};

function PhotoList({ photoList, setPhotoList }: Props) {
  // 포토카드 삭제
  const removePhoto = useCallback((idx: number) => {
    setPhotoList(photoList.filter((item) => item.idx !== idx));
  }, [photoList, setPhotoList]);

  // 포토카드 이름 변경
  const changePhotoName = useCallback((idx: number, value: string) => {
    setPhotoList(photoList.map((item) => item.idx === idx ? {...item, name: value } : { ...item }) );
  }, [photoList, setPhotoList]);

  // 포토카드 오류 메시지 설정
  const setPhotoMessage = useCallback((idx: number, message: string) => {
    setPhotoList(photoList.map((item) => item.idx === idx ? {...item, message } : { ...item }) );
  }, [photoList, setPhotoList]);

  return (
    <Card styles={{ marginBottom: "2em" }}>
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
              message={item.message}
              changePhotoName={changePhotoName}
              removePhoto={removePhoto}
              setPhotoMessage={setPhotoMessage}
            />
          ))}
        </section>
      </CardBody>

    </Card>
  );
}

export default PhotoList;