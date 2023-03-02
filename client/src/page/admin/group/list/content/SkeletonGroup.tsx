import React from 'react';
import { groupImage } from '@api/resource';
import { Link } from 'react-router-dom';
import IconButton from '@component/form/IconButton';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import SkeletonItem from '@component/skeleton/SkeletonItem';

interface Props {

}
const DefaultProps = {};

function SkeletonGroup({  }: Props) {
  return (
    <tr className="Group">
      <td>
        <section className="name-section">
          <SkeletonItem styles={{ width: "60px", height: "60px"}} />
          <SkeletonItem styles={{ width: "7em" }} />
        </section>
      </td>
      <td><SkeletonItem styles={{ width: "5em" }} /></td>
      <td>
        <section className="action-section">
          <SkeletonItem styles={{ width: "2em", marginLeft: "1em" }} />
        </section>
      </td>
    </tr>
  );
}

export default SkeletonGroup;