import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join',
})
export class JoinPipe implements PipeTransform {
  transform(value: [], ...args: unknown[]): any {
    let sectors: any = [];
    if (value.length !== 0) {
      for (let key in value) {
        sectors.push(value[key]);
      }
      return sectors.join(', ');
    }
  }
}
