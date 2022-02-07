import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'NatToBirth',
})
export class NatToBirthPipe implements PipeTransform {
  transform(value: number): string {
    let year: number = +value.toString().substring(1, 3),
      month: number = +value.toString().substring(3, 5),
      day: number = +value.toString().substring(5, 7);

    let date: Date = new Date(`${month}-${day}-${year}`);
    return `${day}-${month}-${date.getFullYear()}` ;
  }
}
