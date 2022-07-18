import React from 'react';
import SkeletonItem from '@component/skeleton/SkeletonItem';
import Table from '@component/table/Table';
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
      <section className="group-section">
        <SkeletonItem width="60px" height="60px" marginRight="1em" marginBottom="1.25em" />
        <div className="name-label"><SkeletonItem width="5em" /></div>
      </section>
      <Card>
        <CardHeader><h1>그룹의 멤버</h1></CardHeader>
        <CardBody padding="0">
          <Table>
            <thead>
              <tr>
                <th className="name">이름</th>
                <th className="photo">등록된 포토카드</th>
                <th className="action">액션</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({length: 8}).map((_, idx) => (
                <tr key={idx}>
                  <td><SkeletonItem width="15em" /></td>
                  <td><SkeletonItem width="5em" /></td>
                  <td>
                    <section className="action-section">
                      <SkeletonItem width="2em" marginLeft="1em" />
                      <SkeletonItem width="2em" marginLeft="1em" />
                    </section>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
}

Skeleton.defaultProps = SkeletonDefaultProps;

export default Skeleton;