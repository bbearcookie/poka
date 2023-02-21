import React from 'react';
import styled, { css } from 'styled-components';

interface Props {
  state: {
    type: "voucher",
    key: VoucherStateKey;
  } | {
    type: "trade",
    key: TradeStateKey;
  };
  width?: string;
  margin?: string;
  padding?: string;
  textAlign?: "start" | "end" | "left" | "right" | "center" | "justify" | "match-parent";
  backgroundColor?: string;
  color?: string;
}
const DefaultProps = {};

const StateLabel = styled.p<Props>`
  width: ${p => p.width};
  padding: ${p => p.padding ? p.padding : "0.3em"};
  margin: ${p => p.margin};
  display: inline-block;
  text-align: ${p => p.textAlign ? p.textAlign : "center"};
  border-radius: 5px;
  background-color: ${p => p.backgroundColor};
  color: ${p => p.color};

  ${p => {
    if (p.state.type === "voucher") {
      switch (p.state.key) {
        case "available":
          return css` background-color: #2196F3; color: white; `
        case "trading":
          return css` background-color: #14B8A6; color: white; `
        case "shipping":
          return css` background-color: #E95188; color: white; `
        case "shipped":
          return css` background-color: #D14343; color: white; `
      }
    } else if (p.state.type === "trade") {
      switch (p.state.key) {
        case "trading":
          return css` background-color: #14B8A6; color: white; `
        case "traded":
          return css` background-color: #D14343; color: white; `
      }
    }

    return css``;
  }}
`

export default StateLabel;

export type VoucherStateKey = "all" | "available" | "trading" | "shipping" | "shipped";
export const VoucherStateValue: {
  [k in VoucherStateKey]: string;
} = {
  all: "전체",
  available: "교환가능",
  trading: "교환중",
  shipping: "배송대기",
  shipped: "배송완료",
}

export type TradeStateKey = "trading" | "traded";
export const TradeStateValue: {
  [k in TradeStateKey]: string;
} = {
  trading: "대기중",
  traded: "완료"
}