import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  game: Game;
  currentCard: string = '';
  name: any;


  constructor(public dialog: MatDialog) {
    this.game = new Game();
  }

  ngOnInit(): void {
  }

  pickCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop()!;
      this.pickCardAnimation = true;

      setTimeout(() => {
        this.pickCardAnimation = false;
        this.game.playedCards.push(this.currentCard);
        if (this.game.players.length-1 > this.game.currentPlayer) {
          this.game.currentPlayer++;
        }
        else {
          this.game.currentPlayer = 0;
        }
      }, 1500);
    }
  }

  newGame() {
    this.game = new Game();
    console.log(this.game)
  }


  openDialog(): void {

    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(name => {
      this.game.players.push(name)
    });

  }


}