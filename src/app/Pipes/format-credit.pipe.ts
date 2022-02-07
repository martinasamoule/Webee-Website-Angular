import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'FormatCredit'
})
export class FormatCreditPipe implements PipeTransform {

  transform(value: string): string {
    let newFormat = value.toString().match(/(....)/g);
    let FormatCredit = newFormat?.join("-")
    return FormatCredit || " ";
  }

}
