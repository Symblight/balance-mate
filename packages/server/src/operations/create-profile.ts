import { ProfileRepository } from "../repositories/profile";

import createDebug from "../configs/debug";

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

    const newProfile =
      await ProfileRepository.createProfileByAuthProviderId(providerId);

    debug(`New profile created for provider ID: ${providerId}`);

    return newProfile;
  } catch (error) {
    debug(`Error in getOrCreateProfileByAuthProviderId: ${error.message}`);
    throw error;
  }
}
