const { Client } = require('pg')

async function checkDb(connectionString) {
  const client = new Client({ connectionString })
  await client.connect()
  try {
    const { rows } = await client.query('SELECT 1 AS ok')
    return rows[0].ok === 1
  } finally {
    await client.end()
  }
}

module.exports = { checkDb }
