import createDebug from "../../configs/debug";

import { TransactionRepository } from "../../repositories/transaction/transaction";
import { AccountRepository } from "../../repositories/account/account";
import { NotFoundException } from "../../exceptions/not-found-exception";

const debug = createDebug("operations:create-transactions");

export async function listTransactionsByProfileId(
  profileId: string,
  pagination: { page: number; limit: number },
) {
  try {
    const [currentAccount] =
      await AccountRepository.getAllByProfileId(profileId);

    if (!currentAccount) {
      throw new NotFoundException("Not found account");
    }

    const listTransactions = await TransactionRepository.getAllByAccountId(
      currentAccount.id,
      pagination,
    );

    return listTransactions;
  } catch (error) {
    debug("Error during transactions gettings:", error.message);
    throw error;
  }
}
