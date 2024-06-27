import { BASE_URL, USER_AGENT } from './constants'
import DataManager from './data'
import type { School } from './models/School'
import type { Timetable } from './models/Timetable'
import { TimetableManager } from './models/Timetable'
import { encodeBase64, encodeEUCKR } from './utils/encode'
import { log10int } from './utils/math'
import { parseResponse } from './utils/parse'
import axios from 'axios'

export default class Comcigan {
  private readonly rest = axios.create({
    baseURL: BASE_URL,
    headers: {
      'User-Agent': USER_AGENT,
    },
  })

  private readonly dataManager = new DataManager(this.rest)

  async searchSchools(schoolName: string): Promise<School[]> {
    const { mainRoute, searchRoute } = await this.dataManager.getData()
    const res = await this.rest.get(
      `${mainRoute}?${searchRoute}l${encodeEUCKR(schoolName)}`,
    )
    const { 학교검색: data } = parseResponse<{
      학교검색: [number, string, string, number][]
    }>(res.data)

    return data.map(([regionCode, regionName, schoolName, schoolCode]) => ({
      code: schoolCode,
      name: schoolName,
      region: { code: regionCode, name: regionName },
    }))
  }

  async getRawTimetable(schoolCode: number): Promise<Timetable[][][][]> {
    const { mainRoute, timetableRoute, teacherCode, dayCode, subjectCode } =
      await this.dataManager.getData()
    const res = await this.rest.get(
      `${mainRoute}_T?${encodeBase64(`${timetableRoute}_${schoolCode}_0_1`)}`,
    )
    const data = parseResponse(res.data)

    const teachers = data[`자료${teacherCode}`] as string[]
    const teachersLen = log10int(teachers.length - 1) + 1
    const subjects = data[`자료${subjectCode}`] as string[]

    return (data[`자료${dayCode}`] as number[][][][]).slice(1).map((grade) =>
      grade.slice(1).map((cls) =>
        cls.slice(1).map((day) =>
          day.slice(1).map((period) => {
            const p = period.toString()

            return {
              subject: subjects[Number(p.slice(0, p.length - teachersLen - 1))],
              teacher: teachers[Number(p.slice(-teachersLen))],
            }
          }),
        ),
      ),
    )
  }

  async getTimetable(schoolCode: number) {
    return new TimetableManager(await this.getRawTimetable(schoolCode))
  }
}
