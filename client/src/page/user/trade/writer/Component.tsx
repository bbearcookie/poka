import React from 'react';
import VoucherSection from './content/VoucherSection';
import PhotocardSection from './content/photocard/PhotocardSection';
import ButtonSection from './content/ButtonSection';
import { State as FormState, Action as FormAction } from './reducer';

interface Props {
  titleText: string;
  onSubmit: (e: React.FormEvent) => void;
  form: FormState;
  formDispatch: React.Dispatch<FormAction>;
}
const DefaultProps = {};

function Component({ titleText, onSubmit, form, formDispatch }: Props) {
  return (
    <div className="TradeWriterPage">
      <h1 className="title-label">교환글 {titleText}</h1>
      <form onSubmit={onSubmit}>
        <VoucherSection form={form} formDispatch={formDispatch} />
        <PhotocardSection form={form} formDispatch={formDispatch} />
        <ButtonSection titleText={titleText} />
      </form>
    </div>
  );
}

export default Component;