"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const pg_1 = require("pg");
let exitInProgress = false;
class Database {
    // TODO: Don't forget poolconfig is a mix of postgres and pgpool config entries
    constructor(p) {
        this.pool = new pg_1.Pool(p.poolConfig);
        this.testModeRollbackAlltransactions = !!p.testModeRollbackAllTransactions;
        process.on('exit', () => {
            this.handleExit();
        });
    }
    static init(p) {
        if (Database.instance)
            return;
        Database.instance = new Database(p);
    }
    handleExit() {
        if (exitInProgress) {
            return;
        }
        exitInProgress = true;
        this.pool.end();
    }
    insideTransaction(handler) {
        return __awaiter(this, void 0, void 0, function* () {
            let client = yield this.pool.connect();
            try {
                let returnedValue = null;
                yield client.query('BEGIN');
                returnedValue = yield handler(client);
                if (this.testModeRollbackAlltransactions) {
                    yield client.query('ROLLBACK');
                }
                else {
                    yield client.query('COMMIT');
                }
                return returnedValue;
            }
            catch (e) {
                yield client.query('ROLLBACK');
                return Promise.reject(e);
            }
            finally {
                client.release();
            }
        });
    }
}
exports.Database = Database;
