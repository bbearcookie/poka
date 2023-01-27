import React from 'react';
import qs from 'qs';
import './Index.scss';

interface Props {

}
const DefaultProps = {};

function Index({  }: Props) {
  const querystring = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const voucherId = Number(querystring.voucherId) || 0;

  return (
    <div className="ShippingWriterPage">
      배송 요청 작성
    </div>
  );
}

export default Index;