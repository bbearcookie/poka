import React from 'react';
import Card from '@component/card/basic/Card';
import CardBody from '@component/card/basic/CardBody';
import Select from '@component/form/Select';

interface Props {}
const DefaultProps = {};

function SelectCard({  }: Props) {
  return (
    <Card className="SelectCard">
      <CardBody>
        <h3 className="label">등록할 포토카드</h3>

        <section className="input-section">
          <section className="input-line">
            <span className="input-label">그룹</span>
            <Select
              styles={{
                width: "100%",
                height: "2.5rem",
                marginLeft: "1em" 
              }}
            >
              <option value={0}>선택</option>
            </Select>
          </section>
        </section>

        <section className="input-section">
          <section className="input-line">
            <span className="input-label">멤버</span>
            <Select
              styles={{
                width: "100%",
                height: "2.5rem",
                marginLeft: "1em" 
              }}
            >
              <option value={0}>선택</option>
            </Select>
          </section>
        </section>

        <p className="description">가지고 있는 소유권 중에서 교환하기를 원하는 포토카드를 선택해주세요.</p>

      </CardBody>
    </Card>
  );
}

export default SelectCard;