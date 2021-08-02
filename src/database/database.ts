import { Database } from './databasehelper'
import config = require('config')
import { PoolConfig } from 'pg'

const db: any = config.get('postgres')
const pgPoolConfig: any = db.pgpool
const connectionString = `postgresql://${db.user}:${db.pass}@${db.host}:${db.port}/${db.name}${db.options}`
const poolConfig: PoolConfig = {
  ...{ connectionString },
  ...pgPoolConfig
}
Database.init({
  poolConfig,
  testModeRollbackAllTransactions: db.rollbackAllTransactions
})

export const database = Database.instance