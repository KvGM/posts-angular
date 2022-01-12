import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any, arg: any): any {   
    if (arg == '') return value
    const searched = [];
    searched.push('p')
    if(typeof value.length == 'undefined') return []
    if (value.length > 0) {
      for (const v of value) {
        if (v.userId == arg) {
          searched.push(v)
        }
      }
      return searched;
    }
  }
}
