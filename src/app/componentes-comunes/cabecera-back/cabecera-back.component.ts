import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cabecera-back',
  templateUrl: './cabecera-back.component.html',
  styleUrls: ['./cabecera-back.component.scss'],
})
export class CabeceraBackComponent {

  @Input('titulo')
  titulo: string;

  constructor() { }


}
