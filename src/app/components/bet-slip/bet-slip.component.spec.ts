import { FormControl } from "@angular/forms";
import { Ball } from "@core/models/Ball";
import { LotteryService } from "@core/services/lottery.service";
import { Constants } from "@core/utils/Constants";
import { BetSlipComponent } from "./bet-slip.component";

describe('BetSlipComponent', () => {

    let component: BetSlipComponent;
    const service = new LotteryService()
    beforeEach(() => {
        component = new BetSlipComponent( service )
    });

    it('Debe llamar al servicio para ejecutar el juego', () => {
        const ball = new Ball({
            id:  1,
            num: 1,
        });
        const espia = spyOn( service, 'setWinningBall' );
        component.ballSelected = ball;
        component.inputAmount = new FormControl(200)
        component.playGame();

        expect(espia).toHaveBeenCalled()
    });
    it('Debe obtener el profit del juego', () => {
        component.ngOnInit();

        expect( component.profit ).toBeGreaterThanOrEqual(Constants.PROFIT);
    })
})