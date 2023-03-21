import React from 'react';
import VoucherSection from './content/voucher/VoucherSection';
import PhotocardSection from './content/photocard/PhotocardSection';
import ButtonSection from './content/ButtonSection';
import { State as FormState, Action as FormAction } from './reducer';

interface Props {
  titleText: string;
  onSubmit: () => void;
  form: FormState;
  formDispatch: React.Dispatch<FormAction>;
}

function Component({ titleText, onSubmit, form, formDispatch }: Props) {
  return (
    <main className="TradeWriterPage">
      <h1 className="title-label">교환글 {titleText}</h1>
      <VoucherSection form={form} formDispatch={formDispatch} />
      <PhotocardSection form={form} formDispatch={formDispatch} />
      <ButtonSection titleText={titleText} handleSubmit={onSubmit} />
    </main>
  );
}

export default Component;