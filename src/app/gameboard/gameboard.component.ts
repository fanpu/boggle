import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';


@Component({
    selector: 'gameboard',
    templateUrl: './gameboard.component.html',
    styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {
    @Input() board: string[];
    @Input() wordInput: string;
    @Output() wordInputChange: EventEmitter<string> = new EventEmitter();
    constructor() { }

    ngOnInit() {
    }

    tileClick(event) {
        // No wildcard characters!
        console.log(event.target.value);
        // Sometimes on chrome the value will be read as undefined..not sure why
        if(event.target.value != "*" && event.target.value != undefined) {
            this.wordInputChange.emit(this.wordInput + event.target.value);
        }
    }

}
