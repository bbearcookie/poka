import React, { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import Input from '@component/form/Input';
import InputMessage from '@component/form/InputMessage';
import Button from '@component/form/Button';
import { State, Action } from '../reducer';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
  changeInput: React.ChangeEventHandler<HTMLInputElement>;
  blurInput: React.FocusEventHandler<HTMLInputElement>;
}
const DefaultProps = {};

function AddressSection({ state, dispatch, changeInput, blurInput }: Props) {
  const daumPostcode = useDaumPostcodePopup();

  // 다음 주소 API 팝업 열기
  const openAddressPopup = useCallback(() => {
    daumPostcode({ onComplete: (data) => {
      let address = data.roadAddress;
      if (data.buildingName) address += ` (${data.buildingName})`
      
      dispatch({ type: 'SET_FORM_DATA', target: 'address', value: address });
      dispatch({ type: 'SET_FORM_DATA', target: 'postcode', value: data.zonecode });
      dispatch({ type: 'SET_MESSAGE', target: 'address', value: '' });
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
            value={state.form.postcode}
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
            value={state.form.address}
            placeholder="주소"
            readOnly={true}
            styles={{
              display: "inline-block",
              width: "100%",
              height: "2.5em"
            }}
          >
            {state.message.address && <InputMessage styles={{ margin: "0.5em 0 0 0" }}>{state.message.address}</InputMessage>}
          </Input>
          <Input
            type="text"
            name="addressDetail"
            value={state.form.addressDetail}
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
            {state.message.addressDetail && <InputMessage styles={{ margin: "0.5em 0 0 0" }}>{state.message.addressDetail}</InputMessage>}
          </Input>
        </div>

      </section>
    </section>
  );
}

export default AddressSection;