import createDebug from "../../configs/debug";

import { TransactionRepository } from "../../repositories/transaction/transaction";
import { AccountRepository } from "../../repositories/account/account";

import { NotFoundException } from "../../exceptions/not-found-exception";

import { Database } from "../../database";

const debug = createDebug("operations:remove-transactions");

export async function removeTransaction({
  id,
  profileId,
}: {
  profileId: string;
  id: string;
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
      Number(currentAccount.current_balance) - Number(targetTransaction.amount);

    await TransactionRepository.removeById(id, trx);

    await AccountRepository.updateBalanceById(
      {
        accountId: currentAccount.id,
        newBalance: updatedBalance,
      },
      trx,
    );

    await trx.commit();
  } catch (error) {
    debug("Error during transaction deleting:", error.message);
    throw error;
  }
}
