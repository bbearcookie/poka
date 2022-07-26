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