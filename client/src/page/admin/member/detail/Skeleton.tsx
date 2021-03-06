import React from 'react';
import SkeletonItem from '@component/skeleton/SkeletonItem';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';

interface SkeletonProps {
  children?: React.ReactNode;
}
const SkeletonDefaultProps = {};

function Skeleton({ children }: SkeletonProps & typeof SkeletonDefaultProps) {
  return (
    <>
      <section className="name-section">
        <SkeletonItem height="2em" marginBottom="0.5em" />
        <SkeletonItem height="1.2em" />

        <Card marginTop="2.3em" marginBottom="5em">
          <CardHeader>
            <section className="title-section">
              <h3 className="title-label">등록된 포토카드</h3>
            </section>
          </CardHeader>
          <CardBody>
            <SkeletonItem height="1.4em" />
          </CardBody>
        </Card>

        <Card marginTop="2.3em" marginBottom="5em">
          <CardHeader>
            <section className="title-section">
              <h3 className="title-label">멤버 삭제</h3>
            </section>
          </CardHeader>
          <CardBody>
            <SkeletonItem height="2em" marginBottom="1.15em" />
            <p className="description">해당 멤버를 삭제하면 연관된 포토카드도 모두 지워지니 신중히 삭제해주세요.</p>
          </CardBody>
        </Card>
      </section>
    </>
  );
}

Skeleton.defaultProps = SkeletonDefaultProps;
export default Skeleton;