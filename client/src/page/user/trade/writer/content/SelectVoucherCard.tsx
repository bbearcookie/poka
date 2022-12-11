import React, { useCallback } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import useModal from '@hook/useModal';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import Button from '@component/form/Button';

interface SelectVoucherCardProps {
  children?: React.ReactNode;
}
const SelectVoucherCardDefaultProps = {};

function SelectVoucherCard({ children }: SelectVoucherCardProps & typeof SelectVoucherCardDefaultProps) {
  return (
    <Card className="SelectVoucherCard">
      <CardHeader>
        <section className="label-section">
          <h3 className="label">헤더</h3>
          <Button
            leftIcon={faPlus}
            styles={{
              height: 'fit-content',
              theme: "primary",
              padding: "0.7em 1.3em",
              iconMargin: "1em"
            }}
            // onClick={(e) => { e.stopPropagation(); addModal.open(); }}
          >추가</Button>
        </section>
      </CardHeader>
      <CardBody>
        SelectVoucherCard
      </CardBody>
    </Card>
  );
}

SelectVoucherCard.defaultProps = SelectVoucherCardDefaultProps;
export default SelectVoucherCard;