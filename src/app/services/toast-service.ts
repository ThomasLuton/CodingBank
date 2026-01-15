import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private showToast(cls: string, message: string) {
    const container = document.querySelector(`#toast`);
    const classes = container?.classList;
    classes?.remove("bg-red-400", "bg-green-400")
    classes?.add(cls);
    const body = container?.querySelector('p');
    body ? body.textContent = message : body;
    classes?.remove("hidden")
  }

  error(message: string) {
    this.showToast("bg-red-400", message);
  }

  success(message: string) {
    this.showToast("bg-green-400", message);
  }
}
