import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {
  
  transform(value: Date|moment.Moment, args: string[]): any {
    if (!value) return value;
    const dateOfBirth = moment(value, "YYYY-MM-DD");
		return moment().diff(dateOfBirth, 'years') + " years old";
  	
  }

}