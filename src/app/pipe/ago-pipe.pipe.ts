import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'agoPipe'
})
export class AgoPipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
