import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss'],
})
export class CabeceraComponent implements OnInit {
  @Input('titulo')
  titulo: string;

  mostrarBoton: boolean = false;
  constructor() {
   }

  ngOnInit() {
  }

}
