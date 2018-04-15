import { Pipe, PipeTransform } from '@angular/core';

/*
  Takes a word as input, then returns the color for the label
  Brighter colors = More points!
*/
@Pipe({
  name: 'labelScore'
})
export class LabelScorePipe implements PipeTransform {
    arr = ["","","","blue","violet","purple","pink","brown","red"];
    
    transform(word: string): string {
        if(word.length>=8) {
            return this.arr[8];
        }
        else {
            return this.arr[word.length];
        }
  }
}
