import { Customer, CustomersResponse, Customer_record } from "./Customer";
import { CustomerDao } from "./CustomerDao";

export class CustomerManager {

    public static MAX_USERS_PER_PAGE = 50;
    public static customerMappingObject = {
        firstName: 'first_name',
        lastName: 'last_name',
        company: 'company'
    }
    public static assembleSortByString(parameterArray: string[], mapping: any) {
        let finalString = 'ORDER BY'
        let order = 'ASC'
        let column = null
        const reqOrder = parameterArray[1]
        if (reqOrder) {
            if (reqOrder.toLocaleLowerCase().match(/dsc/g) || reqOrder.toLocaleLowerCase().match(/desc/g)) {
                order = 'DESC'
            }
        }

        const lookUpColumn = parameterArray[0].replace(/[^A-Za-z]/g, '')
        if (mapping.hasOwnProperty(lookUpColumn)) {
            column = mapping[lookUpColumn]
        }

        if (!!column) {
            finalString += ` ${column} ${order},`
        }
        finalString = finalString.replace(/[^A-Za-z]+$/g, '')
        if (finalString === 'ORDER BY') {
            finalString = ''
        }

        return finalString
    }

    public static async fetchCustomers(client: any, max: number, offset: number, q: string, sort: string, filterString: string | null): Promise<CustomersResponse> {
        let customerResp: CustomersResponse = {
            customersList: [],
            companiesList: []
        }
        let sortString = sort || 'lastName,firstName,company'
        const searchString = q === '%' ? q : `%${q}%`
        if (sortString) {
            sortString = this.assembleSortByString(sortString.trim().split(","), CustomerManager.customerMappingObject)
        }
        const customerRecords: Customer_record[] = await CustomerDao.fetchCustomers(client, max, offset, searchString, sortString, filterString);
        customerResp.customersList = customerRecords.map(record => {
            return {
                firstName: record.first_name,
                lastName: record.last_name,
                company: record.company
            }
        })
        const companiesList = await CustomerDao.fetchUniqueCompanies(client)
        customerResp.companiesList = companiesList.map(companyRecord => companyRecord.company)

        return customerResp
    }
}