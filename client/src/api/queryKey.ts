import { FilterType as VoucherFilter } from '@api/query/voucher/useVouchersQuery';
import { FilterType as PhotoFilter } from '@api/query/photo/usePhotosQuery';
import { FilterType as ShippingFilter } from '@api/query/shipping/useShippingsQuery';
import { FilterType as TradeFilter } from '@api/query/trade/useTradesQuery';
import { FilterType as TradeHistoryFilter } from '@api/query/trade/useUserTradeHistoryQuery';

export const groupKeys = {
  all: ['group'] as const,
  detail: (groupId: number) => [...groupKeys.all, groupId] as const,
  members: (groupId: number) => [...groupKeys.all, groupId, 'member'] as const,
};

export const memberKeys = {
  all: ['member'] as const,
  detail: (memberId: number) => [...memberKeys.all, memberId] as const,
};

export const photoKeys = {
  all: ['photo'] as const,
  list: (filter: PhotoFilter) => [...photoKeys.all, 'list', filter] as const,
  detail: (photocardId: number) => [...photoKeys.all, photocardId] as const,
};

export const voucherKeys = {
  all: ['voucher'] as const,
  list: (filter: VoucherFilter) => [...voucherKeys.all, 'list', filter] as const, // 소유권 목록
  detail: (voucherId: number) => [...voucherKeys.all, voucherId] as const, // 소유권 상세 정보
  log: (voucherId: number) => [...voucherKeys.detail(voucherId), 'log'] as const, // 소유권 상세 기록
  trade: (voucherId: number) => [...voucherKeys.detail(voucherId), tradeKeys.all] as const, // 해당 소유권으로 교환중인 교환글 상세 정보
};

export const userKeys = {
  all: ['user'] as const,
  profile: (userId: number) => [...userKeys.all, 'profile', userId] as const,
};

export const addressKeys = {
  all: ['address'] as const,
  detail: (addressId: number) => [...addressKeys.all, addressId] as const,
};

export const tradeKeys = {
  all: ['trade'] as const,
  list: (filter: TradeFilter) => [...tradeKeys.all, 'list', filter] as const,
  detail: (tradeId: number) => [...tradeKeys.all, tradeId] as const,
  history: (filter: TradeHistoryFilter) => [...tradeKeys.all, 'history', filter] as const, // 교환 내역 목록
  exchange: (tradeId: number) => [...tradeKeys.detail(tradeId), 'exchange'] as const, // 로그인된 사용자가 특정 교환글이 원하는 포토카드 중에서 가지고 있는 소유권 정보
};

export const shippingKeys = {
  all: ['shipping'] as const,
  list: (filter: ShippingFilter) => [...shippingKeys.all, 'list', filter] as const,
  detail: (requestId: number) => [...shippingKeys.all, requestId] as const,
};
