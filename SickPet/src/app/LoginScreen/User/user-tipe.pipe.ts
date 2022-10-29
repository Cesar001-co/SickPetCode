import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userTipe'
})
export class UserTipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
