import React from 'react';
import Card from '@component/card/basic/Card';
import CardBody from '@component/card/basic/CardBody';
import SkeletonUserProfile from '@component/profile/SkeletonUserProfile';

interface LoadingProps {
  children?: React.ReactNode;
}
const LoadingDefaultProps = {};

function Loading({ children }: LoadingProps & typeof LoadingDefaultProps) {
  return (
    <Card styles={{ marginBottom: "5em" }}>
      <CardBody>
        <SkeletonUserProfile />
      </CardBody>
    </Card>
  );
}

Loading.defaultProps = LoadingDefaultProps;
export default Loading;