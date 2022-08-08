import React, { useState } from 'react';
import Input from '@component/form/Input';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import CardFooter from '@component/card/basic/CardFooter';
import Download from './Download';

interface DownloadCardProps {
  cropList: string[];
  setCropList: React.Dispatch<React.SetStateAction<string[]>>;
  children?: React.ReactNode;
}
const DownloadCardDefaultProps = {};

function DownloadCard({ cropList, setCropList, children }: DownloadCardProps & typeof DownloadCardDefaultProps) {
  const [download, setDownload] = useState('');

  return (
    <Card>
      <CardBody>
        <p className="label">다운로드</p>
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

DownloadCard.defaultProps = DownloadCardDefaultProps;
export default DownloadCard;