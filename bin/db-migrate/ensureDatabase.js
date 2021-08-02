#! /usr/bin/env node

const config = require('config')
const Client = require('pg').Client

const db = config.get('postgres')
const adminDatabaseName = db.maintenanceDbName
const connectionString = `postgresql://${db.user}:${db.pass}@${db.host}:${
  db.port
}/${adminDatabaseName}${db.options}`

const client = new Client({
  connectionString
})
client.connect()

const logAndClose = (err, msg) => {
  client.end()
  throw err
}

client.query(
  `select 1 from pg_database WHERE datname='${db.name}'`,
  (err, res) => {
    if (err) {
      logAndClose(err, 'Unable to determine if database exists.')
    }

    if (res.rowCount === 1) {
      client.end()
      return
    }

    client.query(`create database ${db.name}`, (err1, res1) => {
      if (err1) {
        logAndClose(err1, 'Unable to create database.')
      }
      client.end()
    })
  }
)