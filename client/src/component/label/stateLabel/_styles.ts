import styled, { css } from 'styled-components';
import {
  VoucherStateKey,
  VoucherLogStateKey,
  TradeStateKey,
  ShippingStateKey,
  PaymentStateKey,
} from './_types';

export interface LabelProps {
  width?: string;
  margin?: string;
  padding?: string;
  textAlign?: 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'match-parent';
  backgroundColor?: string;
  color?: string;
}

const Label = styled.span<LabelProps>`
  width: ${p => p.width};
  padding: ${p => (p.padding ? p.padding : '0.3em')};
  margin: ${p => p.margin};
  display: inline-block;
  text-align: ${p => (p.textAlign ? p.textAlign : 'center')};
  border-radius: 5px;
  background-color: ${p => p.backgroundColor};
  color: ${p => p.color};
`;

// 소유권 상태
export const VoucherStateLabel = styled(Label)<{ type: VoucherStateKey }>`
  ${p => {
    switch (p.type) {
      case 'available':
        return css`
          background-color: #2196f3;
          color: white;
        `;
      case 'trading':
        return css`
          background-color: #14b8a6;
          color: white;
        `;
      case 'shipping':
        return css`
          background-color: #e95188;
          color: white;
        `;
      case 'shipped':
        return css`
          background-color: #d14343;
          color: white;
        `;
      default:
        return css``;
    }
  }}
`;

// 소유권 기록 타입
export const VoucherLogStateLabel = styled(Label)<{ type: VoucherLogStateKey }>`
  ${p => {
    switch (p.type) {
      case 'issued':
        return css`
          background-color: #2196f3;
          color: white;
        `;
      case 'traded':
        return css`
          background-color: #14b8a6;
          color: white;
        `;
      case 'shipped':
        return css`
          background-color: #e95188;
          color: white;
        `;
      default:
        return css``;
    }
  }}
`;

// 교환글 상태
export const TradeStateLabel = styled(Label)<{ type: TradeStateKey }>`
  ${p => {
    switch (p.type) {
      case 'trading':
        return css`
          background-color: #14b8a6;
          color: white;
        `;
      case 'traded':
        return css`
          background-color: #d14343;
          color: white;
        `;
      default:
        return css``;
    }
  }}
`;

// 배송 요청 상태
export const ShippingStateLabel = styled(Label)<{ type: ShippingStateKey }>`
  ${p => {
    switch (p.type) {
      case 'waiting':
        return css`
          background-color: #2196f3;
          color: white;
        `;
      case 'shipped':
        return css`
          background-color: #d14343;
          color: white;
        `;
      default:
        return css``;
    }
  }}
`;

// 결제 상태
export const PaymentStateLabel = styled(Label)<{ type: PaymentStateKey }>`
  ${p => {
    switch (p.type) {
      case 'waiting':
        return css`
          background-color: #2196f3;
          color: white;
        `;
      case 'paid':
        return css`
          background-color: #d14343;
          color: white;
        `;
      case 'forgeried':
        return css`
          background-color: red;
          color: white;
        `;
      default:
        return css``;
    }
  }}
`;
