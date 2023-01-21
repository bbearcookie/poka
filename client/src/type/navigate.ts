import { Location as L } from "react-router-dom";

export interface Location extends L {
  state: {
    backURL?: string;
  }
}