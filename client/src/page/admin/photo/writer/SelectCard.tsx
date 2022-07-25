import React from 'react';
import Card from '@component/card/basic/Card';
import CardBody from '@component/card/basic/CardBody';
import Select from '@component/form/Select';

interface SelectCardProps {
  children?: React.ReactNode;
}
const SelectCardDefaultProps = {};

function SelectCard({ children }: SelectCardProps & typeof SelectCardDefaultProps) {
  return (
    <Card className="SelectCard">
      <CardBody>
        <h3 className="label">그룹 멤버 정보</h3>
        <section className="input-line">
          <span className="input-label">그룹</span>
          <Select width="100%" height="2.5rem" marginLeft="1em">
            <option>선택</option>
          </Select>
        </section>
        <section className="input-line">
          <span className="input-label">멤버</span>
          <Select width="100%" height="2.5rem" marginLeft="1em">
            <option>선택</option>
          </Select>
        </section>
        <p className="description">등록하려는 포토카드들이 어떤 대상의 포토카드인지를 지정합니다.</p>
      </CardBody>
    </Card>
  );
}

SelectCard.defaultProps = SelectCardDefaultProps;
export default SelectCard;