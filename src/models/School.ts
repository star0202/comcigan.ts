import Comcigan from '../client'
import Fetcher from './Fetcher'
import type Region from './Region'
import type Timetable from './Timetable'

interface ISchool {
  /** 학교 코드 */
  code: number
  /** 학교 이름 */
  name: string
  /** 학교 지역 */
  region: Region
}

export default class School extends Fetcher implements ISchool {
  code: number
  name: string
  region: Region

  constructor(client: Comcigan, data: ISchool) {
    super(client)

    this.code = data.code
    this.name = data.name
    this.region = data.region
  }

  /** 이름으로 학교를 불러옵니다 */
  static async fromName(name: string, client?: Comcigan) {
    const cls = client ?? new Comcigan()
    const res = await cls.searchSchools(name)
    return res[0]
  }

  async getTimetable(): Promise<Timetable[][][][]>
  async getTimetable(grade: number): Promise<Timetable[][][]>
  async getTimetable(grade: number, cls: number): Promise<Timetable[][]>
  async getTimetable(
    grade: number,
    cls: number,
    day: number,
  ): Promise<Timetable[]>
  async getTimetable(
    grade: number,
    cls: number,
    day: number,
    period: number,
  ): Promise<Timetable>
  /** 시간표를 불러옵니다. */
  async getTimetable(
    grade?: number,
    cls?: number,
    day?: number,
    period?: number,
  ) {
    if (grade === undefined) return this.client.getTimetable(this.code)
    if (cls === undefined) return this.client.getTimetable(this.code, grade)
    if (day === undefined)
      return this.client.getTimetable(this.code, grade, cls)
    if (period === undefined)
      return this.client.getTimetable(this.code, grade, cls, day)
    return this.client.getTimetable(this.code, grade, cls, day, period)
  }
}
