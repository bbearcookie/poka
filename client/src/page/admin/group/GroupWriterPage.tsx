import React, { useState, useCallback } from 'react';
import Input from '@component/form/Input';
import Button from '@component/form/Button';
import ImageUploader from '@component/form/uploader/ImageUploader';
import './GroupWriterPage.scss';

interface GroupWriterPageProps {
  children?: React.ReactNode;
}

const GroupWriterPageDefaultProps = {};

function GroupWriterPage({ children }: GroupWriterPageProps & typeof GroupWriterPageDefaultProps) {
  interface Image {
    file: File | null;
    previewURL: string | ArrayBuffer | null;
    initialURL: string;
  }
  const [image, setImage] = useState<Image>({
    file: null,
    previewURL: null,
    initialURL: ''
  });

  return (
    <div className="GroupWriterPage">
      <h1 className="title-label">그룹 등록</h1>
      <form>
        <section className="card">
          <h3 className="label">이름</h3>
          <Input type="text" name="name" placeholder="이름을 입력하세요"/>
          <p className="description">아이돌 그룹의 이름을 지정합니다. 이 이름은 사용자가 포토카드를 찾거나, 관리자가 포토카드 정보를 관리할 때 사용됩니다.</p>
        </section>

        <section className="card logo-card">
          <h3 className="label">로고 이미지</h3>
          <ImageUploader state={image} setState={setImage} />
        </section>
      </form>
    </div>
  );
}

GroupWriterPage.defaultProps = GroupWriterPageDefaultProps;

export default GroupWriterPage;