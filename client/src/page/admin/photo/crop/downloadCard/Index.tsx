import React, { useState } from 'react';
import TitleLabel from '@component/label/TitleLabel';
import Input from '@component/form/input/Input';
import { Card, CardHeader, CardBody, CardFooter } from '@component/card/basic/_styles';
import Download from './Download';

interface Props {
  cropList: string[];
  setCropList: React.Dispatch<React.SetStateAction<string[]>>;
  children?: React.ReactNode;
}

function DownloadCard({ cropList, setCropList }: Props) {
  const [download, setDownload] = useState('');

  return (
    <Card>
      <CardHeader>
        <TitleLabel title="다운로드" />
      </CardHeader>
      <CardBody>
        <section>
          <p css={{ margin: '0 0 0.5em 0' }}>파일명</p>
          <Input
            type="text"
            name="download"
            value={download}
            placeholder="저장될 파일명을 입력해주세요"
            onChange={e => setDownload(e.target.value)}
            css={{
              display: 'inline-block',
              width: '100%',
              height: '2em',
            }}
          />
        </section>
      </CardBody>
      <CardFooter>
        <Download cropList={cropList} setCropList={setCropList} downloadName={download} />
      </CardFooter>
    </Card>
  );
}

export default DownloadCard;
