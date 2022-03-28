import { Component, OnDestroy, OnInit } from '@angular/core';
// Rxjs
import { Subscription } from 'rxjs';
// Servicios
import { LotteryService } from '@core/services/lottery.service';
// utils
import { Ball } from '@core/models/Ball';
import { Bet } from '@core/models/Bet';

@Component({
  selector: 'app-ball-selector',
  templateUrl: './ball-selector.component.html',
  styleUrls: ['./ball-selector.component.scss']
})
export class BallSelectorComponent implements OnInit, OnDestroy {

  ballList!:     Ball[];
  ballSelected!: Ball;
  userBet!:      Bet;
  betSubs!:      Subscription;

  constructor(
    private lotery: LotteryService
  ) { }

  ngOnInit(): void {
    this.ballList = this.lotery.ballList;
    this.getWinnerBall();
  }
  /**
   * Permite observar cuando termina el juego y cual es la pelota ganadora
   */
  getWinnerBall(): void {
    this.betSubs = 
      this.lotery.getWinningBall().subscribe({
        next: ball => {
          this.userBet = ball;
        }
      })
  }

  ngOnDestroy(): void {
    // Se cierra la subscripcion al observable
    this.betSubs && this.betSubs.unsubscribe()
  }

}
