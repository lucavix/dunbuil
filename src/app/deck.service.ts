import { Injectable } from '@angular/core';
import { Attack } from './cards/attack';
import { Card } from './cards/icard';
import { Move } from './cards/move';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  constructor() { 

    var c = localStorage.getItem("deck");
    if (c) {
      var h = JSON.parse(c);
      h.forEach (
        (a:any) => {
          if (a.name==="Attack") this.hand.push(new Attack());
          if (a.name==="Move") this.hand.push(new Move());
        }
      )
      } 
  }


  saveState() {
    localStorage.setItem("deck",JSON.stringify(this.hand));
  }

  pile:Card[] = [];
  discard:Card[] = [];
  hand:Card[] = [];
  reset() {
    this.discard = [];
    this.pile.push(new Move());
    this.pile.push(new Attack());
    this.pile.push(new Attack());
    this.pile.push(new Move());
    this.pile.push(new Move());

    this.hand.push(new Move());
    this.hand.push(new Attack());
    this.hand.push(new Move());
    this.hand.push(new Move());
    this.hand.push(new Attack());
    this.saveState();
  }
}
