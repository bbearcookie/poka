import { IconType } from '@type/icon';
import useSearcher from '@component/search/hook/useSearcher';
import Searcher from '@component/search/Searcher';
import PhotoList from './PhotoList';

interface Props {
  icon?: IconType;
  handleSelect?: (photocardId: number) => void;
}

function PhotoListWithFilter({ icon, handleSelect }: Props) {
  const searcher = useSearcher();

  return (
    <>
      <Searcher
        hook={searcher}
        category={{
          photoName: '포토카드 이름',
        }}
        options={{
          group: true,
          member: true,
        }}
      />

      {searcher.initialized && <PhotoList hook={searcher} icon={icon} handleSelect={handleSelect} />}
    </>
  );
}

export default PhotoListWithFilter;
