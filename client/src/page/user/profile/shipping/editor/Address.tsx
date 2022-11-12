import React, { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import DaumPostcodeEmbed from 'react-daum-postcode';
import useModal from '@hook/useModal';
import Input from '@component/form/Input';
import Button from '@component/form/Button';
import TitleModal from '@component/modal/TitleModal';

interface AddressProps {
  children?: React.ReactNode;
}
const AddressDefaultProps = {};

function Address({ children }: AddressProps & typeof AddressDefaultProps) {
  const addressModal = useModal();

  return (
    <section className="input-line">
      <section className="label-section">
        <FontAwesomeIcon className="icon" icon={faLocationDot} width="1.5em" height="1.5em" color="#2678F3" />
        <span className="label">주소</span>
      </section>

      <section className="input-section">
        <div className="address-section">
          <Input
            type="text"
            name="name"
            placeholder="우편번호"
            styles={{
              display: "inline-block",
              width: "6em",
              height: "2.5em"
            }}
          />
          <Button 
            type="button"
            styles={{
              width: "7em",
              theme: "gray",
              padding: "0.7em 1em"
            }}
            onClick={(e) => { e.stopPropagation(); addressModal.open(); } }
          >주소 찾기</Button>
        </div>

        <div className="detail-address-section">
          <Input
            type="text"
            name="name"
            placeholder="주소"
            styles={{
              display: "inline-block",
              width: "100%",
              height: "2.5em"
            }}
          />
          <Input
            type="text"
            name="name"
            placeholder="상세주소"
            styles={{
              display: "inline-block",
              width: "100%",
              height: "2.5em"
            }}
          />
        </div>

        <TitleModal 
          hook={addressModal}
          titleName='주소 찾기'
          styles={{
            width: "80vh"
          }}
        >
          <DaumPostcodeEmbed style={{ minHeight: "50vh" }} />
        </TitleModal>

      </section>
    </section>
  );
}

Address.defaultProps = AddressDefaultProps;
export default Address;