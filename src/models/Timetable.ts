export interface Timetable {
  /** 과목 */
  subject: string
  /** 교사 */
  teacher: string
}

export class TimetableManager {
  constructor(private readonly timetables: Timetable[][][][]) {}

  /** 특정 학년의 시간표를 가져옵니다. */
  getByGrade(grade: number) {
    return this.timetables[grade - 1]
  }

  /** 특정 반의 시간표를 가져옵니다. */
  getByClass(grade: number, cls: number) {
    return this.timetables[grade - 1][cls - 1]
  }

  /** 특정 반의 특정 요일 시간표를 가져옵니다. */
  getByDay(grade: number, cls: number, day: number) {
    return this.timetables[grade - 1][cls - 1][day - 1]
  }

  /** 특정 반의 특정 요일의 특정 교시 시간표를 가져옵니다. */
  getByPeriod(grade: number, cls: number, day: number, period: number) {
    return this.timetables[grade - 1][cls - 1][day - 1][period - 1]
  }
}
