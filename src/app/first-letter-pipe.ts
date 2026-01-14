import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetter',
})
export class FirstLetterPipe implements PipeTransform {

  transform(value: string | undefined, upperCase: boolean): string | undefined {
    if (upperCase) {
      return value?.substring(0, 1).toUpperCase();
    } else {
      return value?.substring(0, 1).toLowerCase();
    }
  }

}
