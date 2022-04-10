export class Game {
    public players: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public playerImage: string[] = [];
    public currentPlayer: number = 0;
    public currentCard: string = '';
    public pickCardAnimation = false;
    public gameStarted = false;

    constructor() {
        for (let i = 1; i < 14; i++) {
            this.stack.push('clubs_' + i);
            this.stack.push('diamonds_' + i);
            this.stack.push('hearts_' + i);
            this.stack.push('spade_' + i);
        }
        shuffle(this.stack)
    }

    public toJson() {
        return {
            players: this.players,
            stack: this.stack,
            playedCards: this.playedCards,
            playerImage: this.playerImage,
            currentPlayer: this.currentPlayer,
            currentCard: this.currentCard,
            pickCardAnimation: this.pickCardAnimation,
            gameStarted: this.gameStarted,
        };
    }

}

function shuffle(array: string[]) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}