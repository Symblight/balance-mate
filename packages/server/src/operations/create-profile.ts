import { ProfileRepository } from "../repositories/profile";

import createDebug from "../configs/debug";

import { AccountRepository } from "../repositories/account/account";

import { Database } from "../database";

const debug = createDebug("create-profile:operations");

export async function getOrCreateProfileByAuthProviderId(providerId: string) {
  try {
    debug(`Fetching profile for provider ID: ${providerId}`);

    const profile =
      await ProfileRepository.getProfileByAuthProviderId(providerId);

    if (profile) {
      debug(`Profile found for provider ID: ${providerId}`);
      return profile;
    }

    // Transaction
    const trxProvider = Database.knex.transactionProvider();
    const trx = await trxProvider();

    const newProfile = await ProfileRepository.createProfileByAuthProviderId(
      providerId,
      trx,
    );
    await AccountRepository.createByProfileId(
      {
        profileId: newProfile.id,
        initialBalance: 0,
      },
      trx,
    );

    await trx.commit();
    debug(`New profile created for provider ID: ${providerId}`);

    return newProfile;
  } catch (error) {
    debug(`Error in getOrCreateProfileByAuthProviderId: ${error.message}`);
    throw error;
  }
}
