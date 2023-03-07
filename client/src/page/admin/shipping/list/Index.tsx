import React, { useCallback } from 'react';
import useShippingsQuery from '@api/query/shipping/useShippingsQuery';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import TitleLabel from '@component/label/titleLabel/TitleLabel';
import Table from '@component/table/Table';
import Card from '@component/card/basic/Card';
import CardBody from '@component/card/basic/CardBody';
import Shipping from './content/Shipping';
import Success from './Success';
import './Index.scss';

interface Props {}

function Index({  }: Props) {
  const { status, data: shippings, error } = useShippingsQuery();

  return (
    <div className="AdminShippingListPage">
      <TitleLabel title="배송요청 목록" styles={{ marginBottom: "1em" }} />
      <Card>
        <CardBody>
          <Table styles={{ itemHeight: "1em", itemPadding: "1em" }}>
            <thead>
              <tr>
                <th>요청자</th>
                <th>배송 상태</th>
                <th>결제 상태</th>
                <th>소유권 수량</th>
                <th>액션</th>
              </tr>
            </thead>
            <tbody>
              {status === 'success' && <Success res={shippings} />}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Index;