import { RegExes } from './constants'
import type { AxiosInstance } from 'axios'
import { decode } from 'iconv-lite'

interface Data {
  mainRoute: string
  searchRoute: string
  timetableRoute: string

  teacherCode: string
  dayCode: string
  subjectCode: string
}

export default class DataManager {
  private _data: Data | null = null

  private _lastFetch = 0

  constructor(private readonly rest: AxiosInstance) {}

  private async fetchData(): Promise<Data> {
    const res = await this.rest.get('/st', {
      responseType: 'arraybuffer',
    })
    const data = decode(Buffer.from(res.data), 'euc-kr')

    const main = RegExes.MainRoute.exec(data)
    if (!main) throw new Error('Failed to fetch main route')

    const search = RegExes.SearchRoute.exec(data)
    if (!search) throw new Error('Failed to fetch search route')

    const timetable = RegExes.TimetableRoute.exec(data)
    if (!timetable) throw new Error('Failed to fetch timetable route')

    const teacher = RegExes.TeacherCode.exec(data)
    if (!teacher) throw new Error('Failed to fetch teacher code')

    const day = RegExes.DayCode.exec(data)
    if (!day) throw new Error('Failed to fetch day code')

    const subject = RegExes.SubjectCode.exec(data)
    if (!subject) throw new Error('Failed to fetch subject code')

    this._lastFetch = Date.now()
    this._data = {
      mainRoute: main[0],
      searchRoute: search[0],
      timetableRoute: timetable[0],
      teacherCode: teacher[0],
      dayCode: day[0],
      subjectCode: subject[0],
    }
    return this._data
  }

  async getData() {
    if (this._data && Date.now() - this._lastFetch < 1000 * 60 * 60)
      return this._data

    return this.fetchData()
  }
}
