import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'signNumber',
})
export class SignNumberPipe implements PipeTransform {
  transform(value: string | null): string {
    const floatValue = value ? parseFloat(value) : 0;
    let returnValue: string = '';

    if (Math.sign(floatValue) === 1) {
      returnValue = '+' + value;
    } else {
      returnValue = '' + value;
    }

    return returnValue;
  }
}
