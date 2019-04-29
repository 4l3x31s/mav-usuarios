import { Component, OnInit } from '@angular/core';
import { MdlContrato } from '../modelo/mdlContrato';
import { LoadingService } from '../services/util/loading.service';
import { ContratoService } from '../services/db/contrato.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-lista-contratos-solicitados',
  templateUrl: './lista-contratos-solicitados.page.html',
  styleUrls: ['./lista-contratos-solicitados.page.scss'],
})
export class ListaContratosSolicitadosPage implements OnInit {
  public lstContratos: MdlContrato[] = [];
  public lstContratosFiltrado: MdlContrato[] = [];
  constructor(
    public contratoService: ContratoService,
    public loading: LoadingService,
    public navController: NavController
    ){ }

  ngOnInit() {
    this.listarContratos();
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

  public seleccionarContrato(contrato: MdlContrato) {
    console.log(contrato);
    //this.irActualizarContrato(contrato);
    this.navController.navigateRoot('/detalle-contrato');
  }
}
