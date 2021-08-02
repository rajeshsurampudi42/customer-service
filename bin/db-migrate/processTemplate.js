#! /usr/bin/env node

const config = require('config')
const fs = require('fs')
const db /*: {user: string, pass: string, host: string, port: string, name: string, options: string}*/ = config.get('postgres') 
const nodeConfig /*: {args: string}*/ = config.get('nodeConfig') 

fs.writeFileSync(
  './database.json',
  `
  {
    "dev": {
      "host": "${db.host}",
      "user": "${db.user}" ,
      "password" : "${db.pass}" ,
      "port": "${db.port}",
      "database": "${db.name}",
      "driver": "postgres",
      "multipleStatements": true
    },
    "others": "postgres://${db.user}:${db.pass}@${db.host}:${db.port}/${
      db.name
    }${db.options}"
  }`,
  { mode: '0755' }
)
