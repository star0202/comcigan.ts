import assert from 'node:assert'
import test from 'node:test'
import { comcigan } from '.'
import { School } from '../src'

test('Search schools by name', async () => {
  const schools = await comcigan.searchSchools('중학교')
  assert(schools.length > 0)
})

test('Get school by name', async () => {
  const school = await School.fromName('중학교')
  assert(school)
})
