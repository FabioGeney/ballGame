import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

// Utils
import { Constants } from '@core/utils/Constants';
import { Ball } from '@core/models/Ball';
import { getRandomColor } from '@core/utils/funtions';
import { Bet } from '@core/models/Bet';

@Injectable({
  providedIn: 'root'
})
export class LotteryService {
  // winningIdBall se hace privado para evitar que otro componente emita un valor no deseado
  private userBet$ = new Subject<Bet>();
  ballList!: Ball[];
  constructor() { 
    // Se obtiene la lista de pelotas
    this.ballList = this.generateBallList();
  }
  /**
   * Permite construir el arreglo de pelotas apartir de los nums definidos
   * @returns arreglo de Ball
   */
  generateBallList(): Ball[] {
    return Constants.LIST_BALL.map( num => (
      {
        id:    num,
        color: getRandomColor(),
        num
      
      } as Ball))
  }
  /**
   * Determina la bola ganadora y emite la info a los componentes subscritos a userBet$
   */
  setWinningBall( ball: Ball, amount: number ): void {
    // Se obtiene un elemento de la lista de pelotas de forma aleatoria
    const ballWinner = this.ballList[ Math.floor(Math.random() * this.ballList.length)];
    // Se se crea el objeto apuesta
    const bet =  new Bet({
      isWinner: ball.id === ballWinner.id,
      ball: ballWinner,
      amount
    });
    // Se emite la informacion de la pelota ganadora
    this.userBet$.next( bet );
  }
  /**
   * Permite re iniciar el juego
   */
  resetGame(): void {
    this.userBet$.next( undefined! );
  }
  /**
   * Permite notificar a las emisiones de userBet$
   * @returns retorna observable con la bola ganadora
   */
  getWinningBall(): Observable<Bet> {
    // Se crea un observable para que los componentes puedan subscribirse, ya que userBet$ es privado
   return this.userBet$.asObservable()
  }
}
