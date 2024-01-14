import type { Knex } from "knex";

import { Auth0Adapter, Auth0UserInfo } from "../adapters/auth0";
import { Database } from "../database";

export interface ProfileDto {
  id: string;
  sub: string;
  created_at: string;
  updated_at: string;
}

export class ProfileRepository {
  static async getUserInfo(accessToken: string): Promise<{
    profile: ProfileDto;
    info: Auth0UserInfo;
  }> {
    const authProvider = new Auth0Adapter(accessToken);
    const userInfo = await authProvider.getUserInfo();

    const [profile] = await Database.knex
      .select()
      .from<ProfileDto>("profiles")
      .where("provider_user_id", userInfo.data.sub);

    return {
      profile,
      info: userInfo.data,
    };
  }

  static async getProfileByAuthProviderId(providerId: string) {
    const [profile] = await Database.knex
      .select()
      .from<ProfileDto>("profiles")
      .where("provider_user_id", providerId);

    return profile;
  }

  static async getProfileById(id: string) {
    const [profile] = await Database.knex
      .select()
      .from<ProfileDto>("profiles")
      .where("id", IDBRequest);

    return profile;
  }

  static async createProfileByAuthProviderId(
    providerId: string,
    trx?: Knex.Transaction,
  ): Promise<ProfileDto> {
    const [newProfile] = await (trx || Database.knex)
      .insert({ provider_user_id: providerId }, [
        "provider_user_id",
        "id",
        "created_at",
        "updated_at",
      ])
      .into<ProfileDto>("profiles");

    return newProfile;
  }
}
