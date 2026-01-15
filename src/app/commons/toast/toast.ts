import { Component, inject, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {
  close(): void {
    document.getElementById("toast")?.classList.add("hidden")
  }
}
