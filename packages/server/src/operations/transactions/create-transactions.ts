import createDebug from "../../configs/debug";

import { TransactionRepository } from "../../repositories/transaction/transaction";
import { AccountRepository } from "../../repositories/account/account";

import { NotFoundException } from "../../exceptions/not-found-exception";

import { Database } from "../../database";

const debug = createDebug("operations:create-transactions");

function updateBalance({ currentBalance, amount }) {
  return Number(currentBalance) + Number(amount);
}

export async function createTransaction({
  amount,
  profileId,
  description = "",
}: {
  amount: number;
  profileId: string;
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

    const updatedBalance = updateBalance({
      currentBalance: currentAccount.current_balance,
      amount,
    });

    debug(
      "Creating transaction for account ID:",
      currentAccount.id,
      `updated balance: `,
      updatedBalance,
    );
    const accountTransaction = await TransactionRepository.createByAccountId({
      accountId: currentAccount.id,
      amount,
      description,
    }, trx);

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
    debug("Error during transaction creation:", error.message);
    throw error;
  }
}
