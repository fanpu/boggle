import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Scoring } from './scoring';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'Boggle';
    highScore: number = 0;
    score: number = 0;
    dict: string[];
    words: string[] = [];
    wordInput: string = '';
    rawBoard: string = 'A, C, E, D, L, U, G, *, E, *, H, T, G, A, F, K';
    // 'T, A, P, *, E, A, K, S, O, B, R, S, S, *, X, D';
    board: string[];
    graph = [[],[],[],[]];
    gameMessage = "Press Start to Play!";
    gameMessageColor: string;
    praise: string[] = ["Amazing!", "Well done!", "Good job!", "You got it!", "Wow!", "Great job!", "Fantastic!", "Excellent", "Way to go!", "Keep going!", "Outstanding!", "Cool!", "Wonderful!", "Awesome", "Superb!", "Incredible!", "What a genius!", "Sharp eyes!", "Extraordinary!", "Neat!", "Wicked!", "Keep it up!", "Lovely!"];
    colors: string[] = ["red", "orange", "yellow", "olive", "green", "teal", "blue", "purple", "violet", "pink", "brown"]; 
    buttonMessage = "Start!";
    gameOngoing: boolean = false;
    tick: string = ""; 
    private offx = [-1, 0, 1, -1, 1, -1, 0, 1];
    private offy = [-1, -1, -1, 0, 0, 1, 1, 1];
   
    private subscription: Subscription;

    constructor(private http: HttpClient){
        this.updateBoard();
    }
    
    ngOnInit(): void {
        this.http.get('assets/dictionary.json').subscribe(data => {
            this.dict = data['dict'];
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    
    startGame() {
        this.score = 0;
        this.words = [];
        this.wordInput = '';
        this.gameOngoing = true;
        var timer = TimerObservable.create(0, 1000);
        this.subscription = timer.subscribe(t => {
            this.tick = "Time remaining: " + String(180 - t) + 's';
            if(t == 180) {
                this.subscription.unsubscribe();
                this.gameOngoing = false;
                if(this.score > this.highScore) {
                    this.highScore = this.score;
                    this.gameMessageColor = "teal";
                    this.gameMessage = "New high score! Congratulations!";
                } else {
                    this.gameMessageColor = "black";
                    this.gameMessage = "Game over!";
                }
            }
        });
    }

    // To find whether input word exists in board
    // x, y: current pos, toMatch: array of chars left to match, mask: bitmask (1 for avail, 0 used)
    wordSearch(y, x, toMatch, mask) {
        var sum = 0;

        if(toMatch.length == 0) {
            return 1;
        }
        
        for(var i = 0; i < 8; i++) {
            var nx = x + this.offx[i];
            var ny = y + this.offy[i];
            var testBit = 1 << (ny * 4 + nx);

            if(nx >= 0 &&
               nx < 4 &&
               ny >= 0 &&
               ny < 4 &&
               (testBit & mask) &&
               ((this.graph[ny][nx] == toMatch[0]) || (this.graph[ny][nx] == '*'))) {
                sum += this.wordSearch(ny, nx, toMatch.substr(1), mask ^ testBit);
            }
        }
        return sum;
    }

    // Checks whether input exists in board, then whether it is a valid word
    checkInput() {
        var sum = 0;
        var unique = true;
        this.wordInput = this.wordInput.toUpperCase();

        // Has the word been input before?
        this.words.forEach(word => {
            if(word == this.wordInput) {
                unique = false;
            }
        });
        
        if (!unique) {
            this.gameMessageColor = "black";
            this.gameMessage = "Word has been used before";
            this.wordInput='';
            return;
        }
        
        // Check if word is in the board
        this.board.forEach((tile, i) => {
            if(tile==this.wordInput[0] || tile == "*") {
                sum += this.wordSearch(Math.floor(i/4), i%4, this.wordInput.substr(1),  ((1<<16) - 1) ^ (1 << i));
            }
        });

        // Is word too short?
        if (this.wordInput.length < 3) {
            this.gameMessageColor = "black";
            this.gameMessage = "Too short";
            this.wordInput='';
            return;
        }

        // If word can be formed
        if(sum > 0) {
            // Is it a valid english word
            if (this.isValidWord(this.wordInput.toLowerCase())) {
                this.gameMessageColor = this.colors[Math.floor(Math.random() * (this.colors.length + 1))];
                this.gameMessage = this.praise[Math.floor(Math.random() * (this.praise.length + 1))];

                this.words.push(this.wordInput.toUpperCase());

                var scoring = new Scoring();
                this.score += scoring.getScore(this.wordInput.length);

                
                
            } else {
                this.gameMessageColor = "black";
                this.gameMessage = "Invalid word";
            }
        } else {
            this.gameMessageColor = "black";
            this.gameMessage = "Word cannot be formed";
        }
        this.wordInput='';
    }
    
    isValidWord(word) {
        var low = 0;
        var high = this.dict.length - 1;
        var mid = 0;

        while (low <= high) {
            mid = Math.floor((low + high) / 2);
//            console.log(word, mid, this.dict[mid]);
            if (this.dict[mid] > word) {
                high = mid - 1;
            } else if (this.dict[mid] < word) {
                low = mid + 1;
            } else {
                return true;
            }
            
        }
        return false;
    }
    
    updateBoard() {

        this.board = this.rawBoard.replace(/ /g,'').split(",");

        this.board.forEach((tile, i) => {
            this.graph[Math.floor(i/4)][i%4] = tile;
        });
    }
}
