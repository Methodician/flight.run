import {Pipe, PipeTransform} from '@angular/core';
import {Task} from './models/task.model';

@Pipe({
  name: "cohort",
  pure: false
})


export class CompletenessPipe implements PipeTransform {
  transform(input: Task[]){
    var output: Task[] = [];
    for (var i = 0; i < input.length; i++) {
      if (input[i].done === false) {
        output.push(input[i]);
      }
    }
    return output;
  }
}
