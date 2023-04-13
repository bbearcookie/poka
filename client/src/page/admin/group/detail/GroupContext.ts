import { createContext } from 'react';
import { ResType } from '@api/query/group/useGroupQuery';

export default createContext<ResType>({
  groupId: 0,
  imageName: '',
  name: '',
  members: [],
  message: '',
});
