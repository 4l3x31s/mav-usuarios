import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';
import { MdlCliente } from '../modelo/mdlCliente';
import { SesionService } from '../services/sesion.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  cliente: MdlCliente;
  constructor(
    public sesionService: SesionService,
    public navController: NavController
  ) { }

  ngOnInit() {
    this.sesionService.crearSesionBase()
      .then(() => {
        this.sesionService.getSesion()
          .then((cliente) => {
            if (cliente) {
              this.cliente = cliente;
            } else {
              this.navController.navigateRoot('/login');
            }
          });
      });
  }
}
