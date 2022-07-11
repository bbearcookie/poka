export const testListKeys = {
  all: ['todos'] as const,
  detail: (id: number) => [...testListKeys.all, id]
}