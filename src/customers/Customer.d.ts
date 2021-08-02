export interface Customer {
    firstName: string
    lastName: string
    company: string
}

export interface Customer_record {
    first_name: string
    last_name: string
    company: string
}

export interface CustomersResponse {
    customersList: Customer[]
    companiesList: string[]
}