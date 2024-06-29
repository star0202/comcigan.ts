import { RegExes } from '../constants'

// biome-ignore lint/suspicious/noExplicitAny: any as default
export const parseResponse = <T = any>(str: string): T =>
  JSON.parse(str.replace(RegExes.WhiteSpace, ''))
