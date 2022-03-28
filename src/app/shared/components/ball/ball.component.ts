import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Ball } from '@core/models/Ball';

@Component({
  selector: 'app-ball',
  templateUrl: './ball.component.html',
  styleUrls: ['./ball.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BallComponent  {
  @Input() ball!:    Ball;
  @Input() selected!: boolean;
  constructor() {
  }

}
