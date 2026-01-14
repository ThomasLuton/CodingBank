import { ResumeAccount } from "./resumeAccount"

export interface Transaction {
    id: string,
    amount: number,
    description: string,
    emittedAt: string,
    status: string,
    emitter: ResumeAccount
    receiver: ResumeAccount
}