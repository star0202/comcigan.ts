import assert from 'node:assert'
import test from 'node:test'
import { comcigan } from '.'

test('Get timetable by code', async () => {
  const schools = await comcigan.searchSchools('중학교')
  const timetable = await comcigan.getTimetable(schools[0].code)
  assert(timetable)
})

test('Get timetable by school', async () => {
  const schools = await comcigan.searchSchools('중학교')
  const timetable = await schools[0].getTimetable()
  assert(timetable)
})
