import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
// RXJS
import { fromEvent, Subscription } from 'rxjs';
import { pluck, filter, tap } from 'rxjs/operators';

// Lista con las RegExp permitidas
const DEFAULT_FILTER: { [key: string]: any } = {
  num: /[\d\-\.]/,
  alpha: /[a-z_]/i,
  alphanum: /[a-z0-9_]/i
};

@Directive({
  selector: '[appKeyFilter]'
})
export class KeyFilterDirective implements OnInit, OnDestroy{

  @Input() appKeyFilter!: string;
  subsInput!: Subscription;
  subsPaste!: Subscription;

  regExp!: RegExp;
  constructor(private elementRef: ElementRef) { 
  }

  ngOnInit(): void {
    // Se valida que la ppiedad appKeyFilter no sea undefined
    const key = this.appKeyFilter ? this.appKeyFilter : 'num';
    // Se obtiene la expresion regular que se aplica al input
    this.regExp = new RegExp(DEFAULT_FILTER[key])
    this.validateInputValue( );
    this.pasteEvent()
  }
  /**
   * Permite observar el evento keypress en el input donde se agrego la directiva
   */
  validateInputValue( ): void {
    // Referencia del Input donde se agrego la directiva
    const { nativeElement  } = this.elementRef;
    if ( !nativeElement) return;
    // Se implementa observable para detectar el evento 'keypress'
    this.subsInput = fromEvent(nativeElement, 'keypress').pipe(
      // Se filtran los valores que cumplan expresion regular
      tap( (event: any) => {
        // Se obtiene la tecla presionada por el usuario
        const { key: value } = event;
        // Se valida que cumpla la expresion regular
        if ( !this.validateValue(  value ) ) {
          event.preventDefault();
        }
      })
    ).subscribe()
  }
  /**
   * Permite observ el evento paste en el input y determinar si cumple con la expresion regular
   */
  pasteEvent(): void {
    // Referencia del Input donde se agrego la directiva
    const { nativeElement  } = this.elementRef;
    if ( !nativeElement) return;
    this.subsPaste = fromEvent( nativeElement, 'paste' ).pipe(
      tap((event: any) => {
        // Se obtiene la data del evento
        const {clipboardData } = event;
        if ( !clipboardData) return;
        // Se valida que  el texto copiado cumpla la expresion regular
        if ( !this.validateValue(  clipboardData.getData('Text') ) ) {
          event.preventDefault();
        }
      })
    ).subscribe();
  }
  /**
   * Permite determinar si el val enviado es aceptado por la regExp
   * @param val valor a comprobar
   * @returns boolean con el resultado
   */
  validateValue( val: string): boolean {
    return this.regExp.test( val )
  }

  ngOnDestroy(): void {
    this.subsInput && 
      this.subsInput.unsubscribe()
    this.subsPaste && 
      this.subsPaste.unsubscribe()
      
  }

}
