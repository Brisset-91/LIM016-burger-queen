import { Pipe, PipeTransform } from '@angular/core';
import { formatDistance } from 'date-fns';
import { parseISO } from 'date-fns' 

@Pipe({
  name: 'kitchen'
})
export class KitchenPipe implements PipeTransform {

  transform(value: Date): any {
    return formatDistance(new Date(), value)
  }

}
