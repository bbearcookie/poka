import React, { useState } from 'react';
import Input from '@component/form/Input';
import { Card, CardBody, CardFooter } from '@component/card/basic/_styles';
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
      <CardBody>
        <h3 className="label">다운로드</h3>
        <section className="input-line">
          <span className="input-label">파일명</span>
          <Input
            type="text"
            name="download"
            value={download}
            placeholder="파일명"
            onChange={(e) => setDownload(e.target.value)}
            styles={{
              display: "inline-block",
              width: "100%",
              height: "2em",
              marginLeft: "0.5em",
              marginRight: "1em"
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