import React, { useCallback } from 'react';
import { State, Action } from './reducer';
import Keyword from './content/_Keyword';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}

function Keywords({ state, dispatch }: Props) {

  // 키워드 제거
  const handleRemove = useCallback((id: number) => {
    dispatch({ type: "REMOVE_KEYWORD", id });
  }, [dispatch]);

  return (
    <>
      {state.keywords.map(k =>
        <Keyword
          key={k.id}
          category={k.title}
          text={k.value}
          handleClick={() => handleRemove(k.id)}
        />
      )}
    </>
  );
}

export default Keywords;