import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
// Componentes
import { AppComponent } from './app.component';
import { BallComponent } from './shared/components/ball/ball.component';
import { BallSelectorComponent } from './components/ball-selector/ball-selector.component';
import { BetSlipComponent } from './components/bet-slip/bet-slip.component';
import { CardComponent } from './shared/components/card/card.component';
import { MessageComponent } from './shared/components/message/message.component';
// Directiva
import { KeyFilterDirective } from './shared/directiva/key-filter.directive';

@NgModule({
  declarations: [
    AppComponent,
    BallComponent,
    BallSelectorComponent,
    BetSlipComponent,
    CardComponent,
    KeyFilterDirective,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
