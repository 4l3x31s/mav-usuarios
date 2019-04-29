import { Component, OnInit } from '@angular/core';
import { MdlContrato } from '../modelo/mdlContrato';
import { LoadingService } from '../services/util/loading.service';
import { ContratoService } from '../services/db/contrato.service';
import { NavController } from '@ionic/angular';
import { MdlCliente } from '../modelo/mdlCliente';
import { SesionService } from '../services/sesion.service';

@Component({
  selector: 'app-lista-contratos-solicitados',
  templateUrl: './lista-contratos-solicitados.page.html',
  styleUrls: ['./lista-contratos-solicitados.page.scss'],
})
export class ListaContratosSolicitadosPage implements OnInit {
  public lstContratos: MdlContrato[] = [];
  public lstContratosFiltrado: MdlContrato[] = [];
  public cliente: MdlCliente;
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
            this.listarContratosSolicitados(this.cliente.id, 0);
          } else {
            this.navController.navigateRoot('/login');
          }
        });
    });

    
  }

  async listarContratos() {
    this.loading.present();
    await this.contratoService.listaContratos().subscribe( data => {
      this.loading.dismiss();
      this.lstContratos = Object.assign(data);
      this.lstContratosFiltrado = this.lstContratos;
    },  error => {
      this.loading.dismiss();
    });
  }

  async listarContratosSolicitados(idUsuario: number, estadoContrato: number) {
    this.loading.present();
    await this.contratoService.listaContratosSolicitados(idUsuario,estadoContrato).subscribe( data => {
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
