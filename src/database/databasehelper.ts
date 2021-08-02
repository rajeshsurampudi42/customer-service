import { Pool, PoolConfig } from 'pg'

export interface PostCommitHook {
    key: string
    callback: () => Promise<void>
}


let exitInProgress = false
export class Database {
    private pool: Pool
    private testModeRollbackAlltransactions: boolean

    static instance: Database

    // TODO: Don't forget poolconfig is a mix of postgres and pgpool config entries
    private constructor(p: { poolConfig: PoolConfig, testModeRollbackAllTransactions?: boolean }) {
        this.pool = new Pool(p.poolConfig)
        this.testModeRollbackAlltransactions = !!p.testModeRollbackAllTransactions
        process.on('exit', () => {
            this.handleExit()
        })
    }

    static init(p: { poolConfig: PoolConfig, testModeRollbackAllTransactions?: boolean }) {
        if (Database.instance) return
        Database.instance = new Database(p)
    }

    private handleExit() {
        if (exitInProgress) {
            return
        }
        exitInProgress = true
        this.pool.end()
    }

    async insideTransaction<T>(
        handler: (dbQueryRunner: any) => Promise<T>
    ): Promise<T> {
        let client: any = await this.pool.connect()
        try {
            let returnedValue = null

            await client.query('BEGIN')
            returnedValue = await handler(client)
            if (this.testModeRollbackAlltransactions) {
                await client.query('ROLLBACK')
            } else {
                await client.query('COMMIT')
            }
            return returnedValue
        } catch (e) {
            await client.query('ROLLBACK')
            return Promise.reject(e)
        } finally {
            client.release()
        }
    }
}
