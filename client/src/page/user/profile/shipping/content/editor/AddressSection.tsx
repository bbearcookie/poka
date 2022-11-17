import React, { useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@app/redux/reduxHooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import Input from '@component/form/Input';
import InputMessage from '@component/form/InputMessage';
import Button from '@component/form/Button';
import { setInput, setInputMessage } from './addressEditorSlice';

interface AddressSectionProps {
  changeInput: React.ChangeEventHandler<HTMLInputElement>;
  blurInput: React.FocusEventHandler<HTMLInputElement>;
  children?: React.ReactNode;
}
const AddressSectionDefaultProps = {};

function AddressSection({ changeInput, blurInput, children }: AddressSectionProps & typeof AddressSectionDefaultProps) {
  const { form, inputMessage } = useAppSelector(state => state.addressEditor);
  const dispatch = useAppDispatch();
  const daumPostcode = useDaumPostcodePopup();

  // 다음 주소 API 팝업 열기
  const openAddressPopup = useCallback(() => {
    daumPostcode({ onComplete: (data) => {
      let address = data.roadAddress;
      if (data.buildingName) address += ` (${data.buildingName})`
      
      dispatch(setInput({
        name: 'address',
        value: address
      }));
      dispatch(setInput({
        name: 'postcode',
        value: data.zonecode
      }));
      dispatch(setInputMessage({
        name: 'address',
        value: ''
      }));
    }});
  }, [daumPostcode, dispatch]);

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
            name="postcode"
            value={form.postcode}
            placeholder="우편번호"
            readOnly={true}
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
            onClick={openAddressPopup}
          >주소 찾기</Button>
        </div>

        <div className="detail-address-section">
          <Input
            type="text"
            name="address"
            value={form.address}
            placeholder="주소"
            readOnly={true}
            styles={{
              display: "inline-block",
              width: "100%",
              height: "2.5em"
            }}
          >
            {inputMessage.address && <InputMessage styles={{ margin: "0.5em 0 0 0" }}>{inputMessage.address}</InputMessage>}
          </Input>
          <Input
            type="text"
            name="address_detail"
            value={form.address_detail}
            placeholder="상세주소"
            maxLength={50}
            onChange={changeInput}
            onBlur={blurInput}
            styles={{
              display: "inline-block",
              width: "100%",
              height: "2.5em"
            }}
          >
            {inputMessage.address_detail && <InputMessage styles={{ margin: "0.5em 0 0 0" }}>{inputMessage.address_detail}</InputMessage>}
          </Input>
        </div>

      </section>
    </section>
  );
}

AddressSection.defaultProps = AddressSectionDefaultProps;
export default AddressSection;