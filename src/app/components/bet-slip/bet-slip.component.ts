import { Component, Input, OnDestroy, OnInit } from '@angular/core';
// Forms
import { FormControl, Validators } from '@angular/forms';
// Core
import { Constants } from '@core/utils/Constants';
import { Ball } from '@core/models/Ball';
// Rxjs
import { Subscription } from 'rxjs';
// Servicios
import { LotteryService } from '@core/services/lottery.service';

@Component({
  selector: 'app-bet-slip',
  templateUrl: './bet-slip.component.html',
  styleUrls: ['./bet-slip.component.scss']
})
export class BetSlipComponent implements OnInit, OnDestroy {

  profit!:   number;
  minValue!: number;
  total!:    number;

  // FormControl
  inputAmount!: FormControl;
  subsIAmount!: Subscription;

  // Ball
  @Input() ballSelected!: Ball;
  constructor(
    private lotery: LotteryService
  ) { }

  ngOnInit(): void {
    this.profit   = Constants.PROFIT;
    this.minValue = Constants.MIN_BET_VALUE;
    this.total    = 0; 
    this.inputChange();
  }
  /**
   * Permite inicializar el FormControl
   */
  inputChange(): void {
    // se inicializar el FormControl
    this.inputAmount = new FormControl('', [Validators.required, Validators.min(this.minValue)]);
    // Se subscribe a los cambios del formControl
    this.subsIAmount = this.inputAmount.valueChanges.subscribe({
      next: ( val ) => {
        // Se reinician valores cada vez que el usuario modifica el monto a apostar
        this.resetGame();
      }
    })
  }
  /**
   * Permite obtener el total de la apuesta
   */
  getTotal( ): void {
    if ( this.inputAmount.invalid ) {
      return;
    }
    // Se obtiene el valor del formControl
    const { value } = this.inputAmount;
    this.total = this.profit * value;
  }
  /**
   * Permite calcular la bola ganadora
   */
  playGame(): void {
    // Se obtiene el valor del formControl
    const { value } = this.inputAmount;
    if( value && this.ballSelected ) {
      // Se determina la bola ganadora
      this.lotery.setWinningBall( this.ballSelected, value );
    }

  }
  /**
   * Permite reiniciar el juego
   */
  resetGame(): void {
    this.total = 0;
    this.lotery.resetGame();
  }
  ngOnDestroy(): void {
    // Se cierra la subscripcion al observable
    this.subsIAmount && 
      this.subsIAmount.unsubscribe()
  }
}
