import { IconType } from '@type/icon';
import useSearcher from '@component/search/useSearcher';
import Searcher from '@component/search/Searcher';
import PhotoList from './PhotoList';

interface Props {
  icon?: IconType;
  handleSelect?: (photocardId: number) => void;
}

function PhotoListWithFilter({ icon, handleSelect }: Props) {
  const { filter, keyword, filterDispatch, keywordDispatch } = useSearcher();

  return (
    <>
      <Searcher
        category={{
          photoName: '포토카드 이름'
        }}
        options={{
          group: true,
          member: true
        }}
        filter={filter}
        keyword={keyword}
        filterDispatch={filterDispatch}
        keywordDispatch={keywordDispatch}
      />

      <PhotoList filter={filter} keyword={keyword} icon={icon} handleSelect={handleSelect} />
    </>
  );
}

export default PhotoListWithFilter;