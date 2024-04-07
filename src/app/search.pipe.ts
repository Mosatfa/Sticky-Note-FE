import { Pipe, PipeTransform } from '@angular/core';
import { List } from './list';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(arr: any[], term: string): any {
    return arr.filter((ele) => ele.listName.toLowerCase().includes(term.toLowerCase()))
  }

}
