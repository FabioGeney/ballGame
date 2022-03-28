import { Component, Input, OnInit } from '@angular/core';

const TYPE_MESSAGE: { [key: string]: any } = {
  error:   '#fd4b4b',
  success: '#7cdb65'
}

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() msg!:  string;
  @Input() type!: string;
  color!:         string;
  constructor() { }

  ngOnInit(): void {
    this.color = TYPE_MESSAGE[this.type];
  }

}
