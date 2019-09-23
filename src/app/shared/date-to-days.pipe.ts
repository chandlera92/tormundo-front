import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'dateToDays'
})
export class DateToDaysPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const currentDate = moment();
    const memberSince = moment(value).format();
    const diff = currentDate.diff(memberSince, 'days') + 1;

    return diff;
  }

}
