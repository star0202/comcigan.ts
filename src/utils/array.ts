export const mergeMap = <T, F>(
  a: T[],
  b: T[],
  callbackFn: (a: T, b: T) => F,
): F[] => {
  const result = []
  for (let i = 0; i < Math.max(a.length, b.length); i++)
    result.push(callbackFn(a[i], b[i]))

  return result
}
