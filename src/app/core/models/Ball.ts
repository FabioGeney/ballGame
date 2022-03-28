export class Ball {
    id:    number;
    num:   number;
    color: string;
    
    constructor( obj?: any ) {
        this.id    = ( obj && obj.id )  || undefined;
        this.num   = ( obj && obj.num ) || undefined;
        this.color = ( obj && obj.num ) || undefined;
    }
}