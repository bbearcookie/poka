import React, { useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { faTrashCan, faCut } from '@fortawesome/free-solid-svg-icons';
import Button from '@component/form/Button';

interface CropProps {
  cropper: Cropper;
  cropList: string[];
  setCropList: React.Dispatch<React.SetStateAction<string[]>>;
  children?: React.ReactNode;
}
const CropDefaultProps = {};

function Crop({ cropper, cropList, setCropList, children }: CropProps & typeof CropDefaultProps) {

  // 이미지의 해당 영역 자르기
  const handleCrop = useCallback(() => {
    if (typeof cropper !== 'undefined') {
      setCropList(cropList.concat(cropper.getCroppedCanvas().toDataURL()));
      toast.success(`찰칵! 현재 ${cropList.length + 1}장!`, { autoClose: 500, position: toast.POSITION.TOP_CENTER });
    }
  }, [cropper, cropList, setCropList]);

  // 자른 이미지 초기화
  const handleReset = useCallback(() => {
    setCropList([]);
  }, [setCropList]);

  // 키보드로 조작 가능
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === '.') handleCrop();
    }

    window.addEventListener('keyup', handle);
    return () => {
      window.removeEventListener('keyup', handle);
    }
  }, [handleCrop]);

  return (
    <>
      <Button
        theme="primary"
        leftIcon={faCut}
        padding="0.65em 0.5em"
        marginRight="1em"
        onClick={handleCrop}
      >자르기</Button>
      <Button
        theme="primary-outlined"
        leftIcon={faTrashCan}
        padding="0.65em 0.5em"
        marginRight="1em"
        onClick={handleReset}
      >초기화</Button>
    </>
  );
}

Crop.defaultProps = CropDefaultProps;
export default Crop;