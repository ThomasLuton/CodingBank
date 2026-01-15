import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TransactionService } from '../../services/transaction-service';
import { SendTransactionDTO } from '../../models/sendTransactionDTO';
import { form, FormField, min, required, validate } from '@angular/forms/signals';

@Component({
  selector: 'app-send-transaction',
  imports: [FormField, RouterLink],
  templateUrl: './send-transaction.html',
  styleUrl: './send-transaction.css',
})
export class SendTransaction {

  private readonly route = inject(ActivatedRoute);
  private readonly transactionService = inject(TransactionService);

  transactionModel = signal<SendTransactionDTO>({
    emitterAccountId: "",
    receiverAccountId: "",
    amount: 0,
    description: ""
  })

  transactionForm = form(this.transactionModel, (schemaPath) => {
    required(schemaPath.receiverAccountId, { message: "Receiver account id is required" })
    required(schemaPath.amount, { message: "Amount is required" })
    min(schemaPath.amount, 1, { message: "Amount should be positive" })
    required(schemaPath.description, { message: "Description is required" })
    validate(schemaPath.receiverAccountId, ({ value }) => {
      if (value() === this.accountId()) {
        return {
          kind: 'sameAccound',
          message: 'You cannot send money to the same account'
        }
      }
      return null;
    })
  })

  accountId = computed(() => {
    return this.route.snapshot.paramMap.get("accountId");
  })

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.accountId() !== null) {
      this.transactionModel().emitterAccountId = this.accountId() as string;
    }
    this.transactionService.emit(this.transactionModel());
  }

}
