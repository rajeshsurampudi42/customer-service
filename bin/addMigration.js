#! /usr/bin/env node

const shell = require('shelljs')
// Ref: https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/
var myArgs = process.argv.slice(2);
const patchName = myArgs[0]

if (!patchName) {
  console.log('Usage: ./bin/addMigration.js <migrationName>')
}
shell.exec(`./bin/db-migrate/processTemplate.js && npx db-migrate create ${myArgs} --sql-file`)