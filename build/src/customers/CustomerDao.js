"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerDao = void 0;
const daohelper_1 = require("../database/daohelper");
class CustomerDao {
    static fetchCustomers(client, max, offset, searchString, sortString, filterString) {
        return daohelper_1.DaoHelper.queryForArray(client, 'customer_fetch_api', daohelper_1.DaoHelper.param('p_search_string', searchString), daohelper_1.DaoHelper.param('p_limit', max), daohelper_1.DaoHelper.param('p_offset', offset), daohelper_1.DaoHelper.param('p_sort_string', sortString), daohelper_1.DaoHelper.param('p_filter_string', filterString));
    }
    static fetchUniqueCompanies(client) {
        return daohelper_1.DaoHelper.queryForArray(client, 'fetch_unique_companies_api');
    }
}
exports.CustomerDao = CustomerDao;
