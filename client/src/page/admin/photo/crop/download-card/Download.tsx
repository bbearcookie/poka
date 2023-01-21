import React, { Fragment, useCallback, useRef } from 'react';
import Button from '@component/form/Button';

interface Props {
  cropList: string[];
  setCropList: React.Dispatch<React.SetStateAction<string[]>>;
  downloadName: string;
  children?: React.ReactNode;
}
const DefaultProps = {};

function Download({ cropList, setCropList, downloadName }: Props) {
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
        onClick={handleDownload}
        styles={{
          theme: "primary",
          padding: "0.65em 0.5em"
        }}
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

export default Download;