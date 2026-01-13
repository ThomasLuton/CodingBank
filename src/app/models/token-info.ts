import { UserInfo } from "./user-info";

export interface TokenInfo {
    jwt: string,
    user: UserInfo
}