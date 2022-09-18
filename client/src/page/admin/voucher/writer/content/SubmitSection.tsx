import React from 'react';
import Button from '@component/form/Button';

interface SubmitSectionProps {
  children?: React.ReactNode;
}
const SubmitSectionDefaultProps = {};

function SubmitSection({ children }: SubmitSectionProps & typeof SubmitSectionDefaultProps) {
  return (
    <section className="button-section">
      <Button
        styles={{
          theme: "primary-outlined",
          padding: "1em 2em",
          marginLeft: "1em"
        }}
      >취소</Button>
      <Button
        type="submit"
        styles={{
          theme: "primary",
          padding: "1em 2em",
          marginLeft: "1em"
        }}
      >작성</Button>
    </section>
  );
}

SubmitSection.defaultProps = SubmitSectionDefaultProps;
export default SubmitSection;