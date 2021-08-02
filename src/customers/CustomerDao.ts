import { DaoHelper } from '../database/daohelper'
import { Customer_record } from './Customer'

export class CustomerDao {
  public static fetchCustomers(
    client: any,
    max: number, 
    offset: number, 
    searchString: string,
    sortString: string,
    filterString: string | null
  ): Promise<Customer_record[]> {
    return DaoHelper.queryForArray(
      client,
      'customer_fetch_api',
      DaoHelper.param('p_search_string', searchString),
      DaoHelper.param('p_limit', max),
      DaoHelper.param('p_offset', offset),
      DaoHelper.param('p_sort_string', sortString),
      DaoHelper.param('p_filter_string', filterString)
    )
  }

  public static fetchUniqueCompanies(client:any): Promise<any[]> {
    return DaoHelper.queryForArray(
      client,
      'fetch_unique_companies_api'
    )
  }
  
}