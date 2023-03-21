import React from 'react';
import Card from '@component/card/basic/Card';
import CardBody from '@component/card/basic/CardBody';
import SkeletonUserProfile from '@component/profile/SkeletonUserProfile';

interface Props {}

function Loading({  }: Props) {
  return (
    <Card styles={{ marginBottom: "5em" }}>
      <CardBody>
        <SkeletonUserProfile />
      </CardBody>
    </Card>
  );
}

export default Loading;