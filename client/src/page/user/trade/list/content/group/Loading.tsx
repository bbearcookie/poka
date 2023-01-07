import React from 'react';
import SkeletonItem from '@component/skeleton/SkeletonItem';

interface Props {

}
const DefaultProps = {};

function Loading({  }: Props) {
  return (
    <ul className="group-select">
      {Array.from({length: 10}).map((_, idx) =>
      <li key={idx}>
        <SkeletonItem styles={{ width: "4.125rem", height: "4.125rem", borderRadius: "50%", margin: "0 auto 0.5rem auto" }} />
        <SkeletonItem styles={{ width: "4rem", margin: "0 auto" }} />
      </li>)}
    </ul>
  );
}

export default Loading;