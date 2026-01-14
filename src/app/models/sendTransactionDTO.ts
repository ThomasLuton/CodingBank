export interface SendTransactionDTO {
    emitterAccountId: string,
    receiverAccountId: string,
    amount: number,
    description: string
}