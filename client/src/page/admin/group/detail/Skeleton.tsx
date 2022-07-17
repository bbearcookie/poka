import React from 'react';
import SkeletonItem from '@component/skeleton/SkeletonItem';
import WhiteCard, { WhiteCardBody } from '@component/card/WhiteCard';
import Table from '@component/table/Table';

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
      <WhiteCard>
        <WhiteCardBody><h2 className="card-label">그룹의 멤버</h2></WhiteCardBody>
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
      </WhiteCard>
    </>
  );
}

Skeleton.defaultProps = SkeletonDefaultProps;

export default Skeleton;