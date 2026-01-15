import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { OpenAccountForm } from '../../models/open-account-form';
import { form, FormField, required } from '@angular/forms/signals';
import { AccountService } from '../../services/account-service';

@Component({
  selector: 'app-open-account',
  imports: [RouterLink, FormField],
  templateUrl: './open-account.html',
  styleUrl: './open-account.css',
})
export class OpenAccount {

  private readonly accountService = inject(AccountService)

  openModel = signal<OpenAccountForm>({
    initialBalance: 0,
    label: ""
  })

  openForm = form(this.openModel, (schemaPath) => {
    required(schemaPath.label, { message: "Label is required" });
  })

  onSubmit(event: Event) {
    event.preventDefault();
    this.accountService.openAccount(this.openModel());
  }
}
