export type Timetable = {
  /** 과목 */
  subject: string
  /** 교사 */
  teacher: string
  /** 변경 여부 */
  changed: boolean
} & (
  | {
      changed: true
      /** 변경 전 과목 */
      originalSubject: string
      /** 변경 전 교사 */
      originalTeacher: string
    }
  | {
      changed: false
    }
)
