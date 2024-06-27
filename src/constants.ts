export const BASE_URL = 'http://comci.net:4082'

export const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'

export const RegExes = {
  MainRoute: /(?<=\.\/)\d+(?=\?\d+l)/,
  SearchRoute: /(?<=\?)\d+(?=l)/,
  TimetableRoute: /(?<=')\d+(?=_')/,
  TeacherCode: /(?<=성명=자료\.자료)\d+/,
  DayCode: /(?<=일일자료=Q자료\(자료.자료)\d+/,
  SubjectCode: /(?<=자료.자료)\d+(?=\[sb\])/,
  WhiteSpace: /\0+$/,
}

/** 요일 */
export enum Weekday {
  Monday = 1,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
}
