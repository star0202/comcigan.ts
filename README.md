# comcigan.ts

[![npm version](https://img.shields.io/npm/v/comcigan.ts?style=flat-square)](https://www.npmjs.com/package/comcigan.ts)
![License](https://img.shields.io/github/license/star0202/comcigan.ts?style=flat-square)

[컴시간알리미](http://컴시간학생.kr)를 파싱하는 TypeScript 라이브러리입니다.

## 설치

```bash
npm install comcigan.ts  # npm
yarn add comcigan.ts  # yarn
pnpm add comcigan.ts  # pnpm
```

## 사용법

```typescript
import Comcigan, { Weekday } from 'comcigan.ts'

const comcigan = new Comcigan()

const main = async () => {
  const schools = await comcigan.searchSchools('학교 이름')
  const timetable = await comcigan.getTimetable(schools[0].code)

  console.log(timetable.getByDay(1, 2, Weekday.Monday)) // 1학년 2반 월요일 시간표
}

main()
```
