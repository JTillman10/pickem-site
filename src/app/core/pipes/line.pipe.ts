import { Pipe, PipeTransform } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';

@Pipe({
  name: 'line'
})
export class LinePipe implements PipeTransform {
  transform(line: number | string, home: boolean): string {
    line = typeof line === 'number' ? line.toString() : line;
    if (line.charCodeAt(0) === 45) {
      return home ? line : `+${line.slice(1)}`;
    } else {
      return home ? `+${line}` : `-${line}`;
    }
  }
}
