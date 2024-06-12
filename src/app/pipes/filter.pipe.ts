import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(value: any, prop: string, filter: string): any {
    if (value.length === 0 || !filter) {
      return value;
    }
    const items = [];
    for (const item of value) {
      if (item[prop].match(filter)) {
        items.push(item);
      }
    }
    return items;
  }
}
