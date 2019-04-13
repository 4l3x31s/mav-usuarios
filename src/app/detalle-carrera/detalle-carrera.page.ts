import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from '../services/db/cliente.service';
import { LoadingService } from '../services/util/loading.service';
import { AlertService } from '../services/util/alert.service';
import { NavController, ModalController } from '@ionic/angular';
import { MdlCarrera } from '../modelo/mdlCarrera';
import { MdlCliente } from '../modelo/mdlCliente';
import { MapaPage } from '../comun/mapa/mapa.page';
import { SesionService } from '../services/sesion.service';
import { CarreraService } from '../services/db/carrera.service';
import * as moment from 'moment';

@Component({
  selector: 'app-detalle-carrera',
  templateUrl: './detalle-carrera.page.html',
  styleUrls: ['./detalle-carrera.page.scss'],
})
export class DetalleCarreraPage implements OnInit {

  frmCarrera: FormGroup;

  public cliente: MdlCliente;

  public carrera: MdlCarrera = new MdlCarrera(
    null, null, null, null, null,
    null, null, null, null, null,
    null, null, null, null, null,
    null, null, null, null, null,
    null, null);

  constructor(
    public fb: FormBuilder,
    public carreraService: CarreraService,
    public loadingServices: LoadingService,
    public alertService: AlertService,
    public navController: NavController,
    public modalController: ModalController,
    public sesionService: SesionService,
    ) {
      let now = moment().format('DD/MM/YYYY');
      this.carrera.fecha =now;
      console.log(now)
     }

  get f() { return this.frmCarrera.controls; }

  ngOnInit() {
    this.iniciarValidaciones();
    this.sesionService.crearSesionBase()
    .then(() => {
      this.sesionService.getSesion()
        .then((cliente) => {
          if (cliente) {
            this.cliente = cliente;
            console.log("cliente: " +this.cliente.nombre)
          } else {
            this.navController.navigateRoot('/login');
          }
        });
    });
    

  }



  public iniciarValidaciones(){
    this.frmCarrera = this.fb.group({
      /*vNombreCliente: ['', [
        Validators.required,
      ]],*/
      vlatInicio: ['', [
        Validators.required,
      ]],
      vlongInicio: ['', [
        Validators.required,
      ]],
      vlatFin: ['', [
        Validators.required,
      ]],
      vlongFin: ['', [
        Validators.required,
      ]],
      vcosto: ['', [
        Validators.required,
      ]],
      vmoneda: ['', [
        Validators.required,
      ]],
      vcalifCliente: ['', [
        Validators.required,
      ]],
      vcalifConductora: ['', [
        Validators.required,
      ]],
      vobsCliente: ['', [
        Validators.required,
      ]],
      vobsConductora: ['', [
        Validators.required,
      ]],
      vobsCarrera: ['', [
        Validators.required,
      ]],
      vdescLugar: ['', [
        Validators.required,
      ]],
      vfecha: ['', [
        Validators.required,
      ]],
      vhoraInicio: ['', [
        Validators.required,
      ]],
      vhoraFin: ['', [
        Validators.required,
      ]],
      vtipoPago: ['', [
        Validators.required,
      ]],
      vcobro: ['', [
        Validators.required,
      ]],
    })
  }

  public grabar(){
    this.loadingServices.present();
    var identificadorPrueba = Date.now();
    this.carrera.idUsuario = this.cliente.id;        
    this.carrera.estado = 1;

    console.log('idcarrera: ' + identificadorPrueba);

      this.carreraService.crearCarrera(this.carrera)
      .then(() => {
        this.loadingServices.dismiss();
        this.alertService.present('Info','Datos guardados correctamente.');
      })
      .catch( error => {
        this.loadingServices.dismiss();
        console.log(error);
        this.alertService.present('Error','Hubo un error al grabar los datos');
        this.navController.navigateRoot('/home');
      })

  }

  async irMapaOrigen() {
    const modal = await this.modalController.create({
      component: MapaPage
    }).then( dato => {
      dato.present();
      dato.onDidDismiss().then(resultado => {
        console.log(resultado.data);
        this.carrera.latInicio = resultado.data.lat;
        this.carrera.longInicio = resultado.data.lng;
      });
    });
  }
}
