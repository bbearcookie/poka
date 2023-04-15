import React, { useCallback } from 'react';
import Button from '@component/form/button/Button';
import TitleLabel from '@component/label/TitleLabel';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Card, CardHeader, CardBody } from '@component/card/basic/_styles';

interface Props {
  cropList: string[];
  setCropList: React.Dispatch<React.SetStateAction<string[]>>;
}

function CropList({ cropList, setCropList }: Props) {
  const removeCroppedImage = useCallback(
    (id: number) => {
      setCropList(prev => prev.filter((_, i) => id !== i));
    },
    [setCropList]
  );

  return (
    <Card>
      <CardHeader>
        <TitleLabel title="부분 이미지 목록" />
      </CardHeader>
      <CardBody className="item-section">
        {cropList.map((item, idx) => (
          <Card key={idx}>
            <CardBody>
              <img src={item} alt="크롭된 이미지" />
              <Button
                leftIcon={faTrashCan}
                buttonTheme="danger-outlined"
                iconMargin="1em"
                onClick={() => removeCroppedImage(idx)}
                css={{
                  padding: '0.75em',
                  margin: '1em auto 0 auto',
                }}
              >
                취소
              </Button>
            </CardBody>
          </Card>
        ))}
      </CardBody>
    </Card>
  );
}

export default CropList;
