const { checkDb } = require('../src/db')

const url = process.env.DATABASE_URL
const withDb = url ? test : test.skip

describe('database', () => {
  withDb('postgres is reachable', async () => {
    await expect(checkDb(url)).resolves.toBe(true)
  })
})
