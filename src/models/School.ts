import type { Region } from './Region'

export interface School {
  /** 학교 코드 */
  code: number
  /** 학교 이름 */
  name: string
  /** 학교 지역 */
  region: Region
}
