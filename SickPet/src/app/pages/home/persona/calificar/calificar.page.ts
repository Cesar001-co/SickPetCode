import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-calificar',
  templateUrl: './calificar.page.html',
  styleUrls: ['./calificar.page.scss'],
})
export class CalificarPage implements OnInit {

  @Input() cal: any;

  constructor() { }

  ngOnInit() {
  }

}
