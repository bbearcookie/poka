export const groupKeys = {
  all: ['groups'] as const,
  detail: (groupId: number) => [...groupKeys.all, groupId] as const,
  members: (groupId: number) => [...groupKeys.all, groupId, 'members'] as const
}

export const memberKeys = {
  all: ['members'] as const,
  detail: (memberId: number) => [...memberKeys.all, memberId] as const
}

export const photoKeys = {
  all: ['photos'] as const,
  detail: (photocardId: number) => [...photoKeys.all, photocardId] as const
}

export const voucherKeys = {
  all: ['vouchers'] as const, // 전체 소유권 목록
  detail: (voucherId: number) => [...voucherKeys.all, voucherId] as const, // 소유권 상세 정보
  log: (voucherId: number) => [...voucherKeys.detail(voucherId), 'log'] as const, // 소유권 상세 기록
}

export const userKeys = {
  all: ['users'] as const,
  profile: (userId: number) => [...userKeys.all, 'profile', userId] as const,
  address: (userId: number) => [...userKeys.all, ...addressKeys.all, userId] as const
}

export const addressKeys = {
  all: ['address'] as const,
  detail: (addressId: number) => [...addressKeys.all, addressId] as const
}

export const tradeKeys = {
  all: ['trade'] as const,
  detail: (tradeId: number) => [...tradeKeys.all, tradeId] as const,
  exchange: (tradeId: number) => [...tradeKeys.detail(tradeId), 'exchange'] as const
}