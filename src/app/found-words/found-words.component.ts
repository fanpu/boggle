import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'found-words',
    templateUrl: './found-words.component.html',
    styleUrls: ['./found-words.component.css']
})
export class FoundWordsComponent implements OnInit {
    @Input() words: string[];

    constructor() { }

    ngOnInit() {
    }

}
