import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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


  constructor(private firestore: AngularFirestore, public dialog: MatDialog) {
    this.game = new Game();
  }

  ngOnInit(): void {
    this.newGame();
    this.
    firestore.
    collection('games').
    valueChanges().
    subscribe((game) => {
      console.log('game update: ', game)
    });
  }

  pickCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop()!;
      this.pickCardAnimation = true;

      setTimeout(() => {
        this.pickCardAnimation = false;
        this.game.playedCards.push(this.currentCard);
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      }, 1500);
    }
  }

  newGame() {
    this.game = new Game();
    this.firestore
    .collection('games')
    .add(this.game.toJson());
  }


  openDialog(): void {

    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name)
      }
    });
  }
}