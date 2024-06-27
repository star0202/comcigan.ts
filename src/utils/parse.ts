import { RegExes } from '../constants'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseResponse = <T = any>(str: string): T =>
  JSON.parse(str.replace(RegExes.WhiteSpace, ''))
