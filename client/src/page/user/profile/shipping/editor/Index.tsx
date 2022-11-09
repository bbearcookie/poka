import React, { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faInfoCircle, faEdit, faClose, faUser, faHouse } from '@fortawesome/free-solid-svg-icons';
import DaumPostcodeEmbed from 'react-daum-postcode';
import CardBody from '@component/card/basic/CardBody';
import Input from '@component/form/Input';
import Button from '@component/form/Button';
import Address from './Address';

interface EditorProps {
  closeEditor: () => void;
  children?: React.ReactNode;
}
const EditorDefaultProps = {};

function Editor({ closeEditor, children }: EditorProps & typeof EditorDefaultProps) {

  // 폼 전송 이벤트
  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    console.log("submit");
  }, []);

  return (
    <CardBody className="editor-section">
      <form onSubmit={onSubmit}>

        <section className="input-line">
          <section className="label-section">
            <FontAwesomeIcon className="icon" icon={faLocationDot} width="1.5em" height="1.5em" color="#2678F3" />
            <span className="label">배송지 이름</span>
          </section>
          <Input
            type="text"
            name="name"
            styles={{
              width: "100%",
              height: "2.5em"
            }}
          />
        </section>

        <section className="input-line">
          <section className="label-section">
            <FontAwesomeIcon className="icon" icon={faUser} width="1.5em" height="1.5em" color="#EC1B5A" />
            <span className="label">수령인</span>
          </section>
          <section className="input-section">
            <Input
              type="text"
              name="name"
              styles={{
                width: "100%",
                height: "2.5em"
              }}
            />
          </section>
        </section>

        <section className="input-line">
          <section className="label-section">
            <FontAwesomeIcon className="icon" icon={faPhone} width="1.5em" height="1.5em" color="#459A10" />
            <span className="label">전화번호</span>
          </section>
          <section className="input-section">
            <Input
              type="text"
              name="name"
              styles={{
                width: "100%",
                height: "2.5em"
              }}
            />
          </section>
        </section>

        <Address />

        <section className="input-line">
          <section className="label-section">
            <FontAwesomeIcon className="icon" icon={faInfoCircle} width="1.5em" height="1.5em" color="#F3E079" />
            <span className="label">배송 요청사항</span>
          </section>
          <section className="input-section">
            <Input
              type="text"
              name="name"
              styles={{
                width: "100%",
                height: "2.5em"
              }}
            />
          </section>
        </section>

        <section className="button-section">
          <Button 
            type="submit"
            styles={{
              theme: "primary",
              padding: "0.7em 1em",
              marginLeft: "0.5em"
            }}
          >추가</Button>
          <Button
            onClick={closeEditor}
            styles={{
              theme: "gray-outlined",
              padding: "0.7em 1em",
              marginLeft: "0.5em"
            }}
            >취소</Button>
        </section>

      </form>
    </CardBody>
  );
}

Editor.defaultProps = EditorDefaultProps;
export default Editor;