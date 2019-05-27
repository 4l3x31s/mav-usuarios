import { Component, OnInit } from '@angular/core';
import { MdlContrato } from '../modelo/mdlContrato';
import { LoadingService } from '../services/util/loading.service';
import { ContratoService } from '../services/db/contrato.service';
import { NavController } from '@ionic/angular';
import { MdlCliente } from '../modelo/mdlCliente';
import { SesionService } from '../services/sesion.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-lista-contratos-vigentes',
  templateUrl: './lista-contratos-vigentes.page.html',
  styleUrls: ['./lista-contratos-vigentes.page.scss'],
})
export class ListaContratosVigentesPage implements OnInit {
  public lstContratos: MdlContrato[] = [];
  public lstContratosFiltrado: MdlContrato[] = [];
  public cliente: MdlCliente;
  filtros = {}
  constructor(
    public contratoService: ContratoService,
    public loading: LoadingService,
    public navController: NavController,
    public sesionService: SesionService
    ){ }

  ngOnInit() {
    //this.listarContratos();
    
    this.sesionService.crearSesionBase()
    .then(() => {
      this.sesionService.getSesion()
        .then((cliente) => {
          if (cliente) {
            this.cliente = cliente;
            console.log("cliente: " +this.cliente.nombre);
            console.log("id: " +this.cliente.id);
            //this.listaContratosPorEstado(this.cliente.id, 0);
            this.listaContratosPorUsuario(this.cliente.id);
          } else {
            this.navController.navigateRoot('/login');
          }
        });
    });

    
  }

  async listaContratosPorUsuario(idUsuario: number) {
    this.loading.present();
    await this.contratoService.listaContratosPorUsuario(idUsuario).subscribe( data => {
      this.loading.dismiss();
      this.lstContratos = Object.assign(data);
      this.filtrarContrato('estado',1);
    },  error => {
      this.loading.dismiss();
    });
  }

  public filtrarContrato(atributo: string, valor: any) {
    this.filtros[atributo] = val => val == valor;
    this.lstContratosFiltrado = _.filter(this.lstContratos, _.conforms(this.filtros) )
  }

  async listaContratosPorEstado(idUsuario: number, estadoContrato: number) {
    this.loading.present();
    await this.contratoService.listaContratosPorEstado(idUsuario,estadoContrato).subscribe( data => {
      this.loading.dismiss();
      this.lstContratos = Object.assign(data);
      this.lstContratosFiltrado = this.lstContratos;
    },  error => {
      this.loading.dismiss();
    });
  }

  public seleccionarContrato(contrato: MdlContrato) {
    console.log(contrato);
    //this.irActualizarContrato(contrato);
    this.navController.navigateRoot('/detalle-contrato');
  }
}
