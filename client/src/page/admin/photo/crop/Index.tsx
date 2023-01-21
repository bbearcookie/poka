import React, { useState } from 'react';
import ControlCard from './control-card/Index';
import CropCard from './crop-card/Index';
import DownloadCard from './download-card/Index';
import CropList from './CropList';
import Upload from './Upload';
import './Index.scss';

interface Props {}
const DefaultProps = {};

function PhotoCropPage({  }: Props) {
  const [cropList, setCropList] = useState<string[]>([]);
  const [cropper, setCropper] = useState<Cropper>();

  return (
    <div className="PhotoCropPage">
      <Upload setCropper={setCropper} />
      <section className="card-section">
        {cropper && <ControlCard cropper={cropper} />}
        {cropper && <CropCard cropper={cropper} cropList={cropList} setCropList={setCropList} />}
        {cropper && <DownloadCard cropList={cropList} setCropList={setCropList} />}
      </section>
      <CropList cropList={cropList} />
    </div>
  );
}

export default PhotoCropPage;