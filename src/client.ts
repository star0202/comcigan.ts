import axios from 'axios'
import { BASE_URL, USER_AGENT } from './constants'
import DataManager from './data'
import School from './models/School'
import type { Timetable } from './models/Timetable'
import { encodeBase64, encodeEUCKR } from './utils/encode'
import { parseResponse } from './utils/parse'
import { mergeMap } from './utils/array'

export default class Comcigan {
  private readonly rest = axios.create({
    baseURL: BASE_URL,
    headers: {
      'User-Agent': USER_AGENT,
    },
  })

  private readonly dataManager = new DataManager(this.rest)

  /** 학교를 검색합니다. */
  async searchSchools(schoolName: string): Promise<School[]> {
    const { mainRoute, searchRoute } = await this.dataManager.getData()
    const res = await this.rest.get(
      `${mainRoute}?${searchRoute}l${encodeEUCKR(schoolName)}`,
    )
    const { 학교검색: data } = parseResponse<{
      학교검색: [number, string, string, number][]
    }>(res.data)

    return data.map(
      ([regionCode, regionName, schoolName, schoolCode]) =>
        new School(this, {
          code: schoolCode,
          name: schoolName,
          region: { code: regionCode, name: regionName },
        }),
    )
  }

  private async getRawTimetable(
    schoolCode: number,
  ): Promise<Timetable[][][][]> {
    const {
      mainRoute,
      timetableRoute,
      teacherCode,
      originalCode,
      dayCode,
      subjectCode,
    } = await this.dataManager.getData()
    const res = await this.rest.get(
      `${mainRoute}_T?${encodeBase64(`${timetableRoute}_${schoolCode}_0_1`)}`,
    )
    const data = parseResponse(res.data)

    const teachers = data[`자료${teacherCode}`] as string[]
    const teachersLen = Math.floor(Math.log10(teachers.length - 1)) + 1
    const subjects = data[`자료${subjectCode}`] as string[]

    const original = data[`자료${originalCode}`] as number[][][][]
    const now = data[`자료${dayCode}`] as number[][][][]

    const getSubject = (code?: number) =>
      code
        ? subjects[Number(code.toString().slice(0, -teachersLen - 1))]
        : '없음'
    const getTeacher = (code?: number) =>
      code ? teachers[Number(code.toString().slice(-teachersLen))] : '없음'

    return mergeMap(now.slice(1), original.slice(1), (gNow, gOrigin) =>
      mergeMap(gNow.slice(1), gOrigin.slice(1), (cNow, cOrigin) =>
        mergeMap(cNow.slice(1), cOrigin.slice(1), (dNow, dOrigin) =>
          mergeMap(dNow.slice(1), dOrigin.slice(1), (pNow, pOrigin) => {
            const changed = pNow !== pOrigin
            return {
              subject: getSubject(pNow),
              teacher: getTeacher(pNow),
              changed,
              ...(changed
                ? {
                    originalSubject: getSubject(pOrigin),
                    originalTeacher: getTeacher(pOrigin),
                  }
                : {}),
            } as Timetable
          }),
        ),
      ),
    )
  }

  async getTimetable(schoolCode: number): Promise<Timetable[][][][]>
  async getTimetable(
    schoolCode: number,
    grade: number,
  ): Promise<Timetable[][][]>
  async getTimetable(
    schoolCode: number,
    grade: number,
    cls: number,
  ): Promise<Timetable[][]>
  async getTimetable(
    schoolCode: number,
    grade: number,
    cls: number,
    day: number,
  ): Promise<Timetable[]>
  async getTimetable(
    schoolCode: number,
    grade: number,
    cls: number,
    day: number,
    period: number,
  ): Promise<Timetable>
  /** 학교 코드를 이용해 학교 시간표를 불러옵니다. */
  async getTimetable(
    schoolCode: number,
    grade?: number,
    cls?: number,
    day?: number,
    period?: number,
  ) {
    const raw = await this.getRawTimetable(schoolCode)

    if (grade === undefined) return raw
    if (cls === undefined) return raw[grade - 1]
    if (day === undefined) return raw[grade - 1][cls - 1]
    if (period === undefined) return raw[grade - 1][cls - 1][day - 1]
    return raw[grade - 1][cls - 1][day - 1][period - 1]
  }
}
