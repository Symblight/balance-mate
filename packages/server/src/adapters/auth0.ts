import { UserInfoClient, UserInfoResponse, JSONApiResponse } from "auth0";
import config from "config";

export type Auth0UserInfo = UserInfoResponse;

const auth0Config: config.IConfig = config.get("auth0");

export class Auth0Adapter {
  private accessToken: string;
  private client: UserInfoClient;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
    this.client = new UserInfoClient({
      domain: auth0Config
        .get<string>("CLIENT_ISSUER")
        .replace(/^https:\/\//, ""),
    });
  }

  public async getUserInfo(): Promise<JSONApiResponse<UserInfoResponse>> {
    return await this.client.getUserInfo(this.accessToken);
  }
}
