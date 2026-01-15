import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appCustomDisable]',
})
export class CustomDisable {

  private readonly el = inject(ElementRef);

  constructor() {

  }

}
