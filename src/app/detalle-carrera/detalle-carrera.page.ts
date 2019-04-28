import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from '../services/db/cliente.service';
import { LoadingService } from '../services/util/loading.service';
import { AlertService } from '../services/util/alert.service';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { MdlCarrera } from '../modelo/mdlCarrera';
import { MdlCliente } from '../modelo/mdlCliente';
import { MapaPage } from '../comun/mapa/mapa.page';
import { SesionService } from '../services/sesion.service';
import { CarreraService } from '../services/db/carrera.service';
import * as moment from 'moment';
import { NavParamService } from '../services/nav-param.service';

@Component({
  selector: 'app-detalle-carrera',
  templateUrl: './detalle-carrera.page.html',
  styleUrls: ['./detalle-carrera.page.scss'],
})
export class DetalleCarreraPage implements OnInit {

  frmCarrera: FormGroup;

  public cliente: MdlCliente;

  public carrera: MdlCarrera;

  constructor(
    public fb: FormBuilder,
    public carreraService: CarreraService,
    public loadingServices: LoadingService,
    public alertService: AlertService,
    public navController: NavController,
    public modalController: ModalController,
    public sesionService: SesionService,
    public navParams: NavParamService,
    public alertController: AlertController
    ) {
      this.carrera = this.carreraService.getCarreraSesion();
      this.carrera.fechaInicio = moment().format();
      //this.carrera.horaInicio = moment().format('HH:mm');
      this.carrera.latInicio = this.navParams.get().latitudIni;
      this.carrera.longInicio = this.navParams.get().longitudIni;
      this.carrera.latFin = this.navParams.get().latitudFin;
      this.carrera.longFin = this.navParams.get().longitudFin;
      this.carrera.moneda = 'Bolivianos';
      //let montoFinal: number = (ciudadParametro[0].base + ((element.duration.value / 60) * ciudadParametro[0].tiempo) + ((element.distance.value / 1000) * ciudadParametro[0].distancia));
      this.carrera.costo = 35;
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
      vdescLugar: ['', [
        Validators.required,
      ]],
      vmoneda: ['', [
        Validators.required,
      ]],
      vfechaInicio: ['', [
        Validators.required,
      ]],
      vtipoPago: ['', [
        Validators.required,
      ]],
    })
  }
 
  async confirmarFecha() {
    let fechaCarrera =  moment(this.carrera.fechaInicio).toObject();
    console.log(fechaCarrera);
    console.log(fechaCarrera.years);
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: 'Desea crear la carrera en:  <br>' + 
               'Fecha:  <strong>' + fechaCarrera.date  + '/' + (fechaCarrera.months + 1) + '/'+ fechaCarrera.years +'</strong> <br> '+ 
               'Hora :  <strong>' + fechaCarrera.hours + ':' + fechaCarrera.minutes + ' ? </strong>',
      buttons: [
        {
          text: 'cancelar',
          role: 'cancelar',
          cssClass: 'secondary',
          handler: (blah) => {
            //this.grabar();
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.grabar();
          }
        }
      ]
    });

    await alert.present();
  }
  public grabar(){
    this.loadingServices.present();
    //var identificadorPrueba = Date.now();
    this.carrera.idUsuario = this.cliente.id;
    this.carrera.estado = 1;

    //console.log('idcarrera: ' + identificadorPrueba);

      this.carreraService.crearCarrera(this.carrera)
      .then(() => {
        this.loadingServices.dismiss();
        this.alertService.present('Información','Datos guardados correctamente.');
        this.carrera = this.carreraService.getCarreraSesion();
      })
      .catch( error => {
        this.loadingServices.dismiss();
        console.log(error);
        this.alertService.present('Error','Hubo un error al grabar los datos');
      })

      this.navController.navigateRoot('/calendario-carrera');

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
