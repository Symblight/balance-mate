import createDebug from "../../configs/debug";

import { TransactionRepository } from "../../repositories/transaction/transaction";
import { AccountRepository } from "../../repositories/account/account";

import { NegativeBalanceException } from "../../exceptions/negative-balance-exception";
import { NotFoundException } from "../../exceptions/not-found-exception";

import { Database } from "../../database";

const debug = createDebug("operations:create-transactions");

export async function updateTransaction({
  id,
  amount,
  profileId,
  description = "",
}: {
  amount: number;
  profileId: string;
  id: string;
  description: string;
}) {
  try {
    // Transaction
    const trxProvider = Database.knex.transactionProvider();
    const trx = await trxProvider();

    const [currentAccount] = await AccountRepository.getAllByProfileId(
      profileId,
      trx,
    );

    if (!currentAccount) {
      throw new NotFoundException("Not found account");
    }

    const targetTransaction = await TransactionRepository.getById(id, trx);

    if (!targetTransaction) {
      throw new NotFoundException("Not found transaction");
    }

    const updatedBalance =
      Number(currentAccount.current_balance) -
      Number(targetTransaction.amount) +
      Number(amount);

    if (updatedBalance < 0) {
      throw new NegativeBalanceException();
    }

    const accountTransaction = await TransactionRepository.updateById(
      id,
      {
        amount,
        description,
      },
      trx,
    );

    await AccountRepository.updateBalanceById(
      {
        accountId: currentAccount.id,
        newBalance: updatedBalance,
      },
      trx,
    );

    await trx.commit();
    return accountTransaction;
  } catch (error) {
    debug("Error during transaction updating:", error.message);
    throw error;
  }
}
