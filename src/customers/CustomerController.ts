import {
  Controller,
  Get,
  Query,
  Route,
} from "tsoa";
import { database } from "../database/database";
import { Customer, CustomersResponse } from "./Customer";
import { CustomerManager } from "./CustomerManager";

@Route("customers")
export class CustomersController extends Controller {
  @Get("/fetch")
  public async getCustomers(
    @Query() max = CustomerManager.MAX_USERS_PER_PAGE,
    @Query() offset = 0,
    @Query() q = '%',
    @Query() sort = 'firstName',
    @Query() companyFilter: string | null = null,
  ): Promise<CustomersResponse> {
    return await database.insideTransaction(async (client) => {
      return CustomerManager.fetchCustomers(client, max, offset, q, sort, companyFilter)
    })
  }
}