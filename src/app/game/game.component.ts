import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  game: Game;
  name: any;
  gameId: string = '';
  maxPlayer = false;


  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) {
    this.game = new Game();
  }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];

      this
        .firestore
        .collection('games')
        .doc(this.gameId)
        .valueChanges()
        .subscribe((game: any) => {
          this.game.currentPlayer = game.currentPlayer;
          this.game.playedCards = game.playedCards;
          this.game.players = game.players;
          this.game.stack = game.stack;
          this.game.playerImage = game.playerImage;
          this.game.currentCard = game.currentCard;
          this.game.pickCardAnimation = game.pickCardAnimation;
          this.game.gameStarted = game.gameStarted;
        });
    });


  }

  pickCard() {
    if (!this.game.pickCardAnimation && this.game.players.length >= 1) {
      this.game.currentCard = this.game.stack.pop()!;
      this.game.pickCardAnimation = true;
      this.game.gameStarted = true;
      this.saveGame();
      setTimeout(() => {
        this.game.pickCardAnimation = false;
        this.game.playedCards.push(this.game.currentCard);
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
        this.saveGame();
      }, 1500);
    }
  }

  newGame() {
    this.game = new Game();
  }


  openDialog(): void {

    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.playerImage.push('2.png')
        this.saveGame();
      }
      if (this.game.players.length >= 10) {
        this.maxPlayer = true;
      }
    });
  }

  saveGame() {
    this
      .firestore
      .collection('games')
      .doc(this.gameId)
      .update(this.game.toJson());
  }

  editPlayer(PlayerId: number) {
    const dialogRef = this.dialog.open(EditPlayerComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(picture => {
      if (picture) {
        if (picture == 'DELETE') {
          this.game.playerImage.splice(PlayerId, 1);
          this.game.players.splice(PlayerId, 1);
        }
        else {
          this.game.playerImage[PlayerId] = picture;
          if (this.game.players.length < 10) {
            this.maxPlayer = false;
          }
        }
        this.saveGame();
      }
    });
  }

}