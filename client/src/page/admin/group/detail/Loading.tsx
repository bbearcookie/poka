import React from 'react';
import SkeletonItem from '@component/skeleton/SkeletonItem';
import Table from '@component/table/Table';
import TableHead from '@component/table/TableHead';
import TableBody from '@component/table/TableBody';
import TableHeadItem from '@component/table/TableHeadItem';
import TableBodyItem from '@component/table/TableBodyItem';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';

interface LoadingProps {
  children?: React.ReactNode;
}
const LoadingDefaultProps = {};

function Loading({ children }: LoadingProps & typeof LoadingDefaultProps) {
  return (
    <>
      <section className="group-section">
        <SkeletonItem
          styles={{
            width: "60px",
            height: "60px",
            marginRight: "1em",
            marginBottom: "1.25em"
          }}
        />
        <div className="name-label"><SkeletonItem styles={{ width: "5em" }} /></div>
      </section>
      <Card>
        <CardHeader><h1>그룹의 멤버</h1></CardHeader>
        <CardBody styles={{ padding: "5em" }}>
          <Table styles={{ borderStyle: "none" }}>
          <TableHead styles={{ height: "3em" }}>
              <tr>
                <TableHeadItem styles={{ width: "50%", paddingLeft: "1.5em" }}>이름</TableHeadItem>
                <TableHeadItem styles={{ width: "20%" }}>등록된 포토카드</TableHeadItem>
                <TableHeadItem styles={{ width: "30%", paddingRight:"1.5em", textAlign: "right" }}>액션</TableHeadItem>
              </tr>
            </TableHead>
            <TableBody styles={{ height: "5em" }}>
              {Array.from({length: 8}).map((_, idx) => (
                <tr key={idx}>
                  <TableBodyItem styles={{ paddingLeft: "1.5em" }}>
                    <SkeletonItem styles={{ width: "15em" }} />
                  </TableBodyItem>
                  <TableBodyItem>
                    <SkeletonItem styles={{ width: "5em" }} />
                  </TableBodyItem>
                  <TableBodyItem styles={{ paddingLeft: "1.5em" }}>
                    <section className="action-section">
                      <SkeletonItem styles={{ width: "2em", marginLeft: "1em" }} />
                      <SkeletonItem styles={{ width: "2em", marginLeft: "1em" }} />
                    </section>
                  </TableBodyItem>
                </tr>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
}

Loading.defaultProps = LoadingDefaultProps;
export default Loading;