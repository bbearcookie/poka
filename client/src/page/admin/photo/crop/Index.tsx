import { useState } from 'react';
import ControlCard from './control-card/Index';
import CropCard from './crop-card/Index';
import DownloadCard from './download-card/Index';
import CropList from './CropList';
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
      <CropList cropList={cropList} />
    </StyledIndex>
  );
}

export default Index;
