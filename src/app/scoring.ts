export class Scoring {
    /*
      Scoring
      3 Letters: 1 point
      4 Letters: 1 point
      5 Letters: 2 points
      6 Letters: 3 points
      7 Letters: 4 points
      8 or More Letters: 11 points 
    */
    getScore(n) {
        if(n == 3 || n == 4) return 1;
        if(n == 5) return 2;
        if(n == 6) return 3;
        if(n == 7) return 4;
        if(n >= 8) return 11;
    }
}
