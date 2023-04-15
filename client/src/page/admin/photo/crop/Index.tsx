import { useState } from 'react';
import ControlCard from './controlCard/Index';
import CropCard from './cropCard/Index';
import DownloadCard from './downloadCard/Index';
import CropList from './cropList/CropList';
import Upload from './Upload';
import { StyledIndex } from './_styles';

function Index() {
  const [cropList, setCropList] = useState<string[]>([]);
  const [cropper, setCropper] = useState<Cropper>();

  return (
    <StyledIndex>
      <Upload setCropper={setCropper} />
      {cropper && (
        <section className="card-section">
          <ControlCard cropper={cropper} />
          <CropCard cropper={cropper} cropList={cropList} setCropList={setCropList} />
          <DownloadCard cropList={cropList} setCropList={setCropList} />
        </section>
      )}
      <CropList cropList={cropList} setCropList={setCropList} />
    </StyledIndex>
  );
}

export default Index;
