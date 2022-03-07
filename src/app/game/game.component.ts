import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  game: Game;
  currentCard: string | undefined = '';
  constructor() {
    this.game = new Game();
  }

  ngOnInit(): void {
  }

  pickCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;
      setTimeout(() => {
        this.pickCardAnimation = false;
      }, 2000);
    }

  }

  newGame() {
    this.game = new Game();
    console.log(this.game)
  }
}
