export const testListKeys = {
  all: ['todos'] as const,
  detail: (id: number) => [...testListKeys.all, id]
}

export const groupKeys = {
  all: ['groups'] as const,
  detail: (id: number) => [...groupKeys.all, id]
}