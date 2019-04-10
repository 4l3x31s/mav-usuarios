import { AlertService } from './../services/util/alert.service';
import { NavParamService } from './../services/nav-param.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { NavController, ModalController } from '@ionic/angular';
import { MdlCliente } from '../modelo/mdlCliente';
import { SesionService } from '../services/sesion.service';
import { ToastService } from '../services/util/toast.service';
declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  cliente: MdlCliente;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  latitud: string;
  longitud: string;
  paginaRetorno: string;
  constructor(
    public sesionService: SesionService,
    public navParam: NavParamService,
    public navCtrl: NavController,
    public toastCtrl: ToastService,
    public modalController: ModalController,
    public alertController: AlertService
  ) { }

  ngOnInit() {
    this.sesionService.crearSesionBase()
      .then(() => {
        this.sesionService.getSesion()
          .then((cliente) => {
            if (cliente) {
              this.cliente = cliente;
            } else {
              this.navCtrl.navigateRoot('/login');
            }
          });
      });
      this.cargarMapa();
  }
  cargarMapa() {
    const myLatlng = { lat: -16.4978888, lng: -68.1314424};
    const mapOptions = {
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: true,
      fullScreenControl: false,
      center: myLatlng
    };
    this.latitud = myLatlng.lat.toString();
    this.longitud = myLatlng.lng.toString();
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    let marker = new google.maps.Marker
    ({
      position: myLatlng,
      map: this.map,
      draggable: true,
      title: 'Mueveme'
    });
    marker.addListener('dragend', () => {
      console.log(JSON.stringify(marker.getPosition()));
      const objStr: string = JSON.stringify(marker.getPosition());
      const obj = JSON.parse(objStr);
      // window.alert(JSON.stringify(marker.getPosition()));
      this.latitud = obj.lat;
      this.longitud = obj.lng;
    });
    // {"lat":-16.498217987944532,"lng":-68.13232216455685}
  }
}
