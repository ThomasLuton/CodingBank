import { LoginForm } from "./login-form";

export interface TokenInfo {
    jwt: string,
    user: LoginForm
}