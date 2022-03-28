
import { empty } from 'rxjs';
import { BallSelectorComponent } from 'src/app/components/ball-selector/ball-selector.component';

import { LotteryService } from './lottery.service';

describe('LotteryService', () => {
  let component: BallSelectorComponent;
  const service = new LotteryService()
  beforeEach(() => {
    component = new BallSelectorComponent( service )
  });

  it('Debe crear la lista de bolas', () => {
    expect(service.ballList).toBeTruthy();
  });

  it('El existir una subscripcion al observable userBet$ ', () => {
    const espia = spyOn( service, 'getWinningBall' ).
      and.returnValue( empty() );;
    component.getWinnerBall();
    expect(espia).toHaveBeenCalled();
  });
});
