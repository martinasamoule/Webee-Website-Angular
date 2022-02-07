import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'NationalIDToAge',
})
export class NationalIDToAgePipe implements PipeTransform {
  transform(value: number): number {
    let year: number = +value.toString().substring(1, 3),
      month: number = +value.toString().substring(3, 5),
      day: number = +value.toString().substring(5, 7);

    let date: Date = new Date(`${month}-${day}-${year}`);
    let now: Date = new Date();

    let Age = this.diff_years(now, date);
    return Age;
  }
  diff_years(dt2: Date, dt1: Date) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60 * 60 * 24;
    return Math.abs(Math.round(diff / 365.25));
  }
}
