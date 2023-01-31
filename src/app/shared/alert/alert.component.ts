import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input() color='blue'

  get textColor(){
    return `text_${this.color}`
  }

  constructor() { }

  ngOnInit(): void {
  }



}
