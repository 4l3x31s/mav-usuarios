import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'print-error',
  templateUrl: './print-error.component.html',
  styleUrls: ['./print-error.component.scss'],
})
export class PrintErrorComponent implements OnInit {

  @Input("control")
  control: any;
  
  constructor() { }

  ngOnInit() {}

}
