import React, { useEffect } from 'react';

// 아임포트 결제모듈
function Iamport() {
  useEffect(() => {
    const { IMP } = window;
    IMP?.init(process.env.REACT_APP_IAMPORT_IMPCODE);
  }, []);

  return <></>;
}

export default Iamport;