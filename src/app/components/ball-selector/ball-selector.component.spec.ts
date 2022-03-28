
import { LotteryService } from '@core/services/lottery.service';
import { BallSelectorComponent } from './ball-selector.component';
// Rxjs
import { of } from 'rxjs';
// Modelos
import { Bet } from '@core/models/Bet';
import { Ball } from '@core/models/Ball';

describe('BallSelectorComponent', () => {
  let component: BallSelectorComponent;
  const service = new LotteryService()
  beforeEach(() => {
    component = new BallSelectorComponent( service )
  });
  it('Debe Cargar la lista de bolas', () => {

   const ballist: Ball[] = service.ballList;
    component.ngOnInit();
    spyOn( service, 'generateBallList' );

    expect( component.ballList.length === ballist.length).toBeTruthy()
  });

  it('Debe Cargar la apuesta del usuario', () => {
    const ball = new Ball({
      id:  1,
      num: 1,
    })
    const bet = new Bet({
      amount: 400,
      isWinner: false,
      ball,
    })

    spyOn( service, 'getWinningBall' ).and.callFake( () => of<Bet>( bet ));
    component.getWinnerBall();

    expect( component.userBet.ball.id === bet.ball.id).toBeTruthy()
  });

  it('Debe Cerrar la subscripcion al observable', () => {

     component.getWinnerBall();
     component.ngOnDestroy();
     expect( component.betSubs.closed).toBeTrue()
   });
});
