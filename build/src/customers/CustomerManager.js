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
exports.CustomerManager = void 0;
const CustomerDao_1 = require("./CustomerDao");
class CustomerManager {
    static assembleSortByString(parameterArray, mapping) {
        let finalString = 'ORDER BY';
        let order = 'ASC';
        let column = null;
        const reqOrder = parameterArray[1];
        if (reqOrder) {
            if (reqOrder.toLocaleLowerCase().match(/dsc/g) || reqOrder.toLocaleLowerCase().match(/desc/g)) {
                order = 'DESC';
            }
        }
        const lookUpColumn = parameterArray[0].replace(/[^A-Za-z]/g, '');
        if (mapping.hasOwnProperty(lookUpColumn)) {
            column = mapping[lookUpColumn];
        }
        if (!!column) {
            finalString += ` ${column} ${order},`;
        }
        finalString = finalString.replace(/[^A-Za-z]+$/g, '');
        if (finalString === 'ORDER BY') {
            finalString = '';
        }
        return finalString;
    }
    static fetchCustomers(client, max, offset, q, sort, filterString) {
        return __awaiter(this, void 0, void 0, function* () {
            let customerResp = {
                customersList: [],
                companiesList: []
            };
            let sortString = sort || 'lastName,firstName,company';
            const searchString = q === '%' ? q : `%${q}%`;
            if (sortString) {
                sortString = this.assembleSortByString(sortString.trim().split(","), CustomerManager.customerMappingObject);
            }
            const customerRecords = yield CustomerDao_1.CustomerDao.fetchCustomers(client, max, offset, searchString, sortString, filterString);
            customerResp.customersList = customerRecords.map(record => {
                return {
                    firstName: record.first_name,
                    lastName: record.last_name,
                    company: record.company
                };
            });
            const companiesList = yield CustomerDao_1.CustomerDao.fetchUniqueCompanies(client);
            customerResp.companiesList = companiesList.map(companyRecord => companyRecord.company);
            return customerResp;
        });
    }
}
exports.CustomerManager = CustomerManager;
CustomerManager.MAX_USERS_PER_PAGE = 50;
CustomerManager.customerMappingObject = {
    firstName: 'first_name',
    lastName: 'last_name',
    company: 'company'
};
