import React from 'react';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import AddressSkeleton from './content/AddressSkeleton';

interface LoadingProps {
  children?: React.ReactNode;
}
const LoadingDefaultProps = {};

function Loading({ children }: LoadingProps & typeof LoadingDefaultProps) {
  return (
    <Card styles={{ marginBottom: "5em" }}>
      <CardHeader>
        <h1 className="subtitle-label">배송 정보</h1>
      </CardHeader>
      <CardBody styles={{ padding: "0" }}>
        {Array.from({ length: 5 }).map((_, idx) => <AddressSkeleton key={idx} />)}
      </CardBody>
    </Card>
  );
}

Loading.defaultProps = LoadingDefaultProps;
export default Loading;