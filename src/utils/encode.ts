import { encode } from 'iconv-lite'

export const encodeEUCKR = (str: string) =>
  [...encode(str, 'euc-kr')].map((v) => '%' + v.toString(16)).join('')

export const encodeBase64 = (str: string) => Buffer.from(str).toString('base64')
