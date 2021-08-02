"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const databasehelper_1 = require("./databasehelper");
const config = require("config");
const db = config.get('postgres');
const pgPoolConfig = db.pgpool;
const connectionString = `postgresql://${db.user}:${db.pass}@${db.host}:${db.port}/${db.name}${db.options}`;
const poolConfig = Object.assign({ connectionString }, pgPoolConfig);
databasehelper_1.Database.init({
    poolConfig,
    testModeRollbackAllTransactions: db.rollbackAllTransactions
});
exports.database = databasehelper_1.Database.instance;
