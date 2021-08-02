#! /usr/bin/env node

const config = require('config')
const Client = require('pg').Client

const db = config.get('postgres')
const adminDatabaseName = db.maintenanceDbName
const connectionString = `postgresql://${db.user}:${db.pass}@${db.host}:${
  db.port
}/${adminDatabaseName}${db.options}`

if (process.env.NODE_ENV === 'production') {
  const message = {
    message:
      'DestroyDatabase is a development feature, and is disallowed in production mode.'
  }
  throw message
}

const client = new Client({
  connectionString
})
client.connect()

const logAndClose = (err, msg) => {
  client.end()
  throw err
}

const terminateClause = `
SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = '${db.name}'
  AND pid <> pg_backend_pid();
`

client.query(terminateClause, (err, res) => {
  if (err) {
    logAndClose(err, 'Unable to determine if database exists.')
  }

  client.query(`drop database ${db.name}`, (err1, res1) => {
    if (err1) {
      logAndClose(err1, 'Unable to drop database.')
    }
    client.end()
  })
})
