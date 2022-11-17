import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const name = 'addressEditor';

export interface FormType {
  name: string;
  recipient: string;
  contact: string;
  postcode: string;
  address: string;
  address_detail: string;
  requirement: string;
}

interface State {
  form: FormType;
  inputMessage: { [k in keyof FormType]: string; }
}

const initialState: State = {
  form: {
    name: '',
    recipient: '',
    contact: '',
    postcode: '',
    address: '',
    address_detail: '',
    requirement: ''
  },
  inputMessage: {
    name: '',
    recipient: '',
    contact: '',
    postcode: '',
    address: '',
    address_detail: '',
    requirement: ''
  }
}

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    initialize: (state) => {
      state.form = initialState.form;
      state.inputMessage = initialState.inputMessage;
    },
    setDefaultState: (state, { payload }: PayloadAction<FormType>) => {
      state.form = payload;
    },
    setInput: (state, { payload }: PayloadAction<{ name: keyof FormType; value: string; }>) => {
      state.form[payload.name] = payload.value;
    },
    setInputMessage: (state, { payload }: PayloadAction<{ name: keyof FormType; value: string; }>) => {
      state.inputMessage[payload.name] = payload.value;
    }
  }
});

export const { initialize, setDefaultState, setInput, setInputMessage } = slice.actions;
export default slice.reducer;