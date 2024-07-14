# comcigan.ts

[![npm version](https://img.shields.io/npm/v/comcigan.ts?style=flat-square)](https://www.npmjs.com/package/comcigan.ts)
![License](https://img.shields.io/github/license/star0202/comcigan.ts?style=flat-square)

[컴시간알리미](http://컴시간학생.kr)를 파싱하는 TypeScript 라이브러리입니다.

컴시간알리미의 구조 및 파싱 방법은 [docs/README.md](./docs/README.md)를 참고해주세요.

## 설치

```bash
npm install comcigan.ts  # npm
yarn add comcigan.ts  # yarn
pnpm add comcigan.ts  # pnpm
```

## 사용 예시

```typescript
import Comcigan, { School, Weekday } from "comcigan.ts";

const comcigan = new Comcigan();

const main = async () => {
  const searchedSchools = await comcigan.searchSchools("학교 이름"); // 학교 검색
  const school = await School.fromName("학교 이름"); // 바로 불러오기 (== searchedSchools[0])

  console.log(await school.getTimetable(3, 3, Weekday.Friday)); // 3학년 3반 금요일 시간표
  console.log(await comcigan.getTimetable(school.code, 3, 3, Weekday.Friday)); // 학교 코드를 이용하는 방법
};

main();
```
