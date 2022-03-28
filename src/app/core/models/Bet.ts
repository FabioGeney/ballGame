import { Ball } from "./Ball";

export class Bet {
    ball:     Ball;
    amount:   number;
    isWinner: boolean;
    constructor( obj?: any) {
        this.ball     = ( obj && obj.ball )  || undefined;
        this.amount   = ( obj && obj.amount )  || 0;
        this.isWinner = ( obj && obj.isWinner );

    }
}