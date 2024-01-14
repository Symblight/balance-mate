import createDebug from "../../configs/debug";

import { AccountRepository } from "../../repositories/account/account";

const debug = createDebug("operations:list-accounts");

export async function getListAccountsByProfileId(profileId: string) {
  try {
    debug("Getting accounts for profile ID:", profileId);
    const accounts = await AccountRepository.getAllByProfileId(profileId);

    const mappedAccounts = accounts.map((account) => ({
      ...account,
      initial_balance: Number(account.initial_balance),
      current_balance: Number(account.current_balance),
    }));

    debug("Accounts got successfully");
    return mappedAccounts;
  } catch (error) {
    debug("Error getting account:", error.message);
    throw error;
  }
}
