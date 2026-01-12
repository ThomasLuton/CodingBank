import { Component, output } from '@angular/core';

@Component({
  selector: 'app-password-key-board',
  imports: [],
  templateUrl: './password-key-board.html',
  styleUrl: './password-key-board.css',
})
export class PasswordKeyBoard {

  onDigitInput = output<number>();
  cases = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10];

  constructor() {
    this.cases.sort((a, b) => Math.random() > 0.5 ? 1 : -1);
  }

  emitDigit(input: number) {
    this.onDigitInput.emit(input);
  }

}
