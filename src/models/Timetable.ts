export interface Timetable {
  subject: string
  teacher: string
}

export class TimetableManager {
  constructor(private readonly timetables: Timetable[][][][]) {}

  getByGrade(grade: number) {
    return this.timetables[grade - 1]
  }

  getByClass(grade: number, cls: number) {
    return this.timetables[grade - 1][cls - 1]
  }

  getByDay(grade: number, cls: number, day: number) {
    return this.timetables[grade - 1][cls - 1][day - 1]
  }

  getByPeriod(grade: number, cls: number, day: number, period: number) {
    return this.timetables[grade - 1][cls - 1][day - 1][period - 1]
  }
}
