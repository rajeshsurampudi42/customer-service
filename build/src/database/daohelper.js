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
exports.DaoHelper = void 0;
class DaoHelper {
    static getArgumentString(params) {
        return params
            .map((param, idx) => `${param.name} := $${idx + 1}${param.type ? '::' + param.type + '[]' : ''}`)
            .join(', ');
    }
    static param(name, value) {
        return { name, value };
    }
    static query(client, functionName, ...params) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = DaoHelper.getArgumentString(params);
            const values = params.map(p => p.value);
            const sql = `select * from ${functionName}(${args})`;
            return client
                .query(sql, values)
                .then((queryResult) => queryResult)
                .catch((err) => {
                return Promise.reject(err);
            });
        });
    }
    static queryForArray(client, functionName, ...params) {
        return __awaiter(this, void 0, void 0, function* () {
            return DaoHelper.query(client, functionName, ...params).then(queryResult => queryResult.rows);
        });
    }
}
exports.DaoHelper = DaoHelper;
