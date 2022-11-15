export const testListKeys = {
  all: ['todos'] as const,
  detail: (id: number) => [...testListKeys.all, id] as const
}

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
  mine: ['vouchers', 'mine'] as const, // 자신의 소유권 목록
  detail: (voucherId: number) => [...voucherKeys.all, voucherId] as const,
  select: ['vouchers', 'select'] as const
}

export const userKeys = {
  all: ['users'] as const,
  profile: (userId: number) => [...userKeys.all, 'profile', userId] as const,
  address: (userId: number) => [...userKeys.all, 'address', userId] as const
}