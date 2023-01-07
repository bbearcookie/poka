import React from 'react';

interface Props {

}
const DefaultProps = {};

function Loading({  }: Props) {
  return (
    <ul className="member-select">
      {Array.from({length: 10}).map((_, idx) => <li className="skeleton" key={idx} />)}
    </ul>
  );
}

export default Loading;