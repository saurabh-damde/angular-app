import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
})
export class ShortenPipe implements PipeTransform {
  transform(value: string, limit?: number): string {
    const splitValue = value.split(' ');
    let newValue = splitValue.slice(0, limit || 1).join(' ');
    if (splitValue.length > limit) {
      newValue += '...';
    }
    return newValue;
  }
}
