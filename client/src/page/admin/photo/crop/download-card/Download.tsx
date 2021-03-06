import React, { Fragment, useCallback, useRef } from 'react';
import Button from '@component/form/Button';

interface DownloadProps {
  cropList: string[];
  setCropList: React.Dispatch<React.SetStateAction<string[]>>;
  downloadName: string;
  children?: React.ReactNode;
}
const DownloadDefaultProps = {};

function Download({ cropList, setCropList, downloadName, children }: DownloadProps & typeof DownloadDefaultProps) {
  const fileRefs = useRef<HTMLAnchorElement[] | null[]>([]);

  // 다운로드 동작
  const handleDownload = useCallback(() => {
    fileRefs.current.forEach((item, idx) => {
      item?.click();
    });
    setCropList([]);
  }, [fileRefs, setCropList]);

  return (
    <>
      <Button
        theme="primary"
        padding="0.65em 0.5em"
        onClick={handleDownload}
      >다운로드</Button>
      {cropList.map((item, idx) => (
        <Fragment key={idx}>
          <a
            className="download-link"
            href={item}
            download={downloadName}
            ref={(el) => (fileRefs.current[idx] = el)}
          >다운로드</a>
        </Fragment>
      ))}
    </>
  );
}

Download.defaultProps = DownloadDefaultProps;
export default Download;