import type { Knex } from "knex";

import { Database } from "../../database";
import type { AccountDto } from "../../types/account";

export class AccountRepository {
  static async createByProfileId(
    {
      profileId,
      initialBalance = 0,
    }: {
      profileId: string;
      initialBalance: number;
    },
    trx?: Knex.Transaction,
  ): Promise<AccountDto> {
    const [account] = await (trx || Database.knex)
      .insert(
        {
          profile_id: profileId,
          account_name: "default",
          initial_balance: initialBalance,
          current_balance: initialBalance,
        },
        [
          "profile_id",
          "id",
          "account_name",
          "initial_balance",
          "current_balance",
          "created_at",
          "updated_at",
        ],
      )
      .into<AccountDto>("accounts");

    return account;
  }

  static async getAllByProfileId(profileId: string, trx?: Knex.Transaction) {
    const accounts = await (trx || Database.knex)
      .select()
      .from<AccountDto>("accounts")
      .where("profile_id", profileId);

    const mappedAccounts = accounts.map((account) => ({
      ...account,
      initial_balance: Number(account.initial_balance),
      current_balance: Number(account.current_balance),
    }));

    return mappedAccounts;
  }

  static async getById(accountId: string, trx?: Knex.Transaction) {
    const account = await (trx || Database.knex)
      .select()
      .from<AccountDto>("accounts")
      .where("id", accountId)
      .first();

    return account;
  }

  static async updateBalanceById(
    {
      accountId,
      newBalance,
    }: {
      accountId: string;
      newBalance: number;
    },
    trx?: Knex.Transaction,
  ) {
    const affectedRows = await (trx || Database.knex)
      .where("id", accountId)
      .update({ current_balance: newBalance })
      .table("accounts");

    if (affectedRows === 0) {
      throw new Error("Update failed, no rows affected");
    }

    const account = await this.getById(accountId);

    return account;
  }
}
