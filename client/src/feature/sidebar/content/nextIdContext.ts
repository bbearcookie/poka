import { createContext, MutableRefObject } from 'react';

export default createContext<MutableRefObject<number> | undefined>(undefined);
