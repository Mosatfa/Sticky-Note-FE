import { HtmlParser } from '@angular/compiler';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'newLine'
})
export class NewLinePipe implements PipeTransform {
  constructor(private _DomSanitizer:DomSanitizer){}
  transform(value: string): string {
    return value.replace(/\n/g, '</br>');
  }

}
