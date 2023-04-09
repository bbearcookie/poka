import { useEffect } from 'react';

function useIamport() {
  useEffect(() => {
    const { IMP } = window;
    IMP?.init(process.env.REACT_APP_IAMPORT_IMPCODE);
  }, []);
}

export default useIamport;