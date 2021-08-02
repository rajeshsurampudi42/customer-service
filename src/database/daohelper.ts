import { QueryResult } from 'pg'

export class DaoHelper {
  private static getArgumentString(params: any[]): string {
    return params
      .map(
        (param, idx) =>
          `${param.name} := $${idx + 1}${
            param.type ? '::' + param.type + '[]' : ''
          }`
      )
      .join(', ')
  }

  public static param(name: string, value: any): any {
    return { name, value }
  }

  public static async query(
    client: any,
    functionName: string,
    ...params: any[]
  ): Promise<QueryResult> {
    const args: string = DaoHelper.getArgumentString(params)
    const values = params.map(p => p.value)
    const sql = `select * from ${functionName}(${args})`

    return client
      .query(sql, values)
      .then((queryResult: any) => queryResult)
      .catch((err: { stack: any }) => {
        return Promise.reject(err)
      })
  }

  public static async queryForArray(
    client: any,
    functionName: string,
    ...params: any[]
  ): Promise<any[]> {
    return DaoHelper.query(client, functionName, ...params).then(
      queryResult => queryResult.rows
    )
  }
}