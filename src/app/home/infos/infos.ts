import { Component, computed, inject, Signal } from '@angular/core';
import { AccountService } from '../../services/account-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-infos',
  imports: [DatePipe, RouterLink],
  templateUrl: './infos.html',
  styleUrl: './infos.css',
})
export class Infos {
  private readonly accountService = inject(AccountService);
  private readonly route = inject(ActivatedRoute);
  private readonly id = computed<string>(() => {
    const id = this.route.snapshot.paramMap.get("accountId")
    if (id !== null) {
      return id;
    }
    return "";
  })
  account = toSignal(this.accountService.getAccount(this.id()))
}
