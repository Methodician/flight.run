import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncateStringPipe implements PipeTransform {

  transform(value: string, args?: number): any {
    const max = args ? args : 25;

    if (!value) { return };

    if (value.length > max) {
      return `${value.substr(0, max)}...`
    }
    return value;
  }

}