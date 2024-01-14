import type { Knex } from "knex";

import { Database } from "../../database";
import type { TransactionDto } from "../../types/transaction";
import { RepositoryModel } from "../model";

export class TransactionRepository {
  static async createByAccountId(
    {
      accountId,
      amount,
      description,
    }: {
      accountId: string;
      amount: number;
      description: string;
    },
    trx?: Knex.Transaction,
  ): Promise<TransactionDto> {
    const [transaction] = await (trx || Database.knex)
      .insert(
        {
          account_id: accountId,
          amount,
          description,
        },
        [
          "account_id",
          "id",
          "amount",
          "description",
          "created_at",
          "updated_at",
        ],
      )
      .into<TransactionDto>("transactions");

    return transaction;
  }

  static async getById(id: string, trx?: Knex.Transaction) {
    const transaction = await (trx || Database.knex)
      .select()
      .from<TransactionDto>("transactions")
      .where("id", id)
      .first();

    return transaction;
  }

  static async updateById(
    id: string,
    { amount, description },
    trx?: Knex.Transaction,
  ) {
    const affectedRows = await (trx || Database.knex)
      .where("id", id)
      .update({ amount, description })
      .table("transactions");

    if (affectedRows === 0) {
      throw new Error("Update failed, no rows affected");
    }

    const transaction = await this.getById(id);
    return transaction;
  }

  static async getAllByAccountId(
    accountId: string,
    { page, limit }: { page: number; limit: number },
    trx?: Knex.Transaction,
  ) {
    const client = trx || Database.knex;

    const { offset, lastPage, prevPage, currentPage, total } =
      await new RepositoryModel().getPagination({
        page,
        limit,
        client,
        tableName: "transactions",
      });

    const list = await client("transactions")
      .select()
      .where("account_id", accountId)
      .limit(limit)
      .offset(offset)
      .orderBy("created_at", "desc");

    return {
      rows: list,
      total: total || 0,
      meta: {
        from: offset + 1,
        prevPage,
        currentPage,
        lastPage,
        limit,
        offset,
      },
    };
  }

  static async removeById(id: string, trx?: Knex.Transaction) {
    await (trx || Database.knex).where("id", id).delete().table("transactions");
  }
}
