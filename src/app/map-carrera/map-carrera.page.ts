import { AlertService } from './../services/util/alert.service';
import { NavParamService } from './../services/nav-param.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { NavController, ModalController, Events, AlertController, Platform } from '@ionic/angular';
import { MdlCliente } from '../modelo/mdlCliente';
import { SesionService } from '../services/sesion.service';
import { ToastService } from '../services/util/toast.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Observable } from 'rxjs';
import { LoadingService } from '../services/util/loading.service';

declare var google;
@Component({
  selector: 'app-map-carrera',
  templateUrl: './map-carrera.page.html',
  styleUrls: ['./map-carrera.page.scss'],
})
export class MapCarreraPage implements OnInit {
  cliente: MdlCliente;
  @ViewChild('maps') mapElement: ElementRef;
  map: any;
  latitudIni: string;
  longitudIni: string;
  latitudFin: string;
  longitudFin: string;
  paginaRetorno: string;

  searchBox: any;
  pais: string;
  ciudad: string;
  constructor(
    public sesionService: SesionService,
    public navParam: NavParamService,
    public navCtrl: NavController,
    public modalController: ModalController,
    public alertService: AlertService,
    public alertController: AlertController,
    public geolocation: Geolocation,
    public events: Events,
    public platform: Platform
  ) {
    
   }

  ngOnInit() {
    this.pais = this.navParam.get().pais;
    this.ciudad = this.navParam.get().ciudad;
    console.log("pais:::: ",this.pais);
    console.log("ciudad:: ",this.ciudad);
    this.latitudFin = null;
    /*this.sesionService.crearSesionBase()
      .then(() => {
        this.sesionService.getSesion()
          .then((cliente) => {
            if (cliente) {
              this.cliente = cliente;
            } else {
              this.navCtrl.navigateRoot('/login');
            }
          });
      });*/
      this.posicionamiento();
  }
  posicionamiento() {
    navigator.geolocation.getCurrentPosition((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      //const myLatlng = { lat: resp.coords.latitude, lng: resp.coords.longitude};
      let myLatlng: any = { lat: -16.4971653, lng: -68.1320507};
      this.cargarMapa(myLatlng);
     });
  }
  buscarTexto(map, markers, alertService): Observable<any> {
    return Observable.create((observer) => {
      this.searchBox.addListener('places_changed', () =>{
        //marker.setMap(null);
        let places = this.searchBox.getPlaces();
        if (places.length === 0) {
          return;
        }
        markers.forEach(function(marker) {
          marker.setMap(null);
        });
        markers = [];
        var bounds = new google.maps.LatLngBounds();
        let contador = 0;
        places.forEach(function(place) {
          if (!place.geometry) {
            console.log("El lugar buscado no existe");
            return;
          }
          if (contador < 1) {
            markers.push(new google.maps.Marker({
              map: map,
              draggable: true,
              title: 'Destino Carrera',
              position: place.geometry.location,
              animation: google.maps.Animation.DROP,
              icon: 'assets/image/pin-end.png'
            }));
            console.log(markers.length);
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          }
          contador++;
        });
        console.log(markers.length);
        if(contador === 1) {
          map.fitBounds(bounds);
          observer.next(markers);
          observer.complete();
        } else {
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          alertService.present('Alerta', 'debes escojer una opcion de la lista');
          return;
        }
      });
  });
  }
  markerEvent(markers): Observable<any> {
    return Observable.create((observer) => {
      console.log(JSON.stringify(markers[0].getPosition()));
      const objStr: string = JSON.stringify(markers[0].getPosition());
      const obj = JSON.parse(objStr);
      this.latitudFin = obj.lat;
      this.longitudFin = obj.lng;
      markers[0].addListener('dragend', () => {
        console.log(JSON.stringify(markers[0].getPosition()));
        const objStr: string = JSON.stringify(markers[0].getPosition());
        const obj = JSON.parse(objStr);
        observer.next(obj);
        observer.complete();
      });
  });
  }
  cargarMapa(myLatlng) {
    // const myLatlng = { lat: -16.4978888, lng: -68.1314424};
    const mapOptions = {
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false,
      fullScreenControl: false,
      zoomControl: false,
      scaleControl: false,
      rotateControl: false,
      fullscreenControl: false,
      center: myLatlng
    };
    this.latitudIni = myLatlng.lat.toString();
    this.longitudIni = myLatlng.lng.toString();
    var map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    let input = document.getElementById('pac-input-carrera');
    this.searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    map.addListener('bounds_changed', () =>{
      this.searchBox.setBounds(map.getBounds());
    });
    let markers = [];
    
    let marker = new google.maps.Marker
    ({
      position: myLatlng,
      map: map,
      draggable: true,
      title: 'Inicio Carrera',
      animation: google.maps.Animation.DROP,
      icon: 'assets/image/pin-user.png'
    });
    marker.addListener('dragend', () => {
      console.log(JSON.stringify(marker.getPosition()));
      const objStr: string = JSON.stringify(marker.getPosition());
      const obj = JSON.parse(objStr);
      // window.alert(JSON.stringify(marker.getPosition()));
      this.latitudIni = obj.lat;
      this.longitudIni = obj.lng;
    });
    let respuesta = this.buscarTexto(map, markers, this.alertService);
    respuesta.subscribe( markers2 => {
      console.log("ingreso")
      let respuesta = this.markerEvent(markers2);
          respuesta.subscribe(obj => {
            this.latitudFin = obj.lat;
            this.longitudFin = obj.lng;
            console.log(this.latitudFin);
          });
    })
  }

  public irRegistroCarrera() {
    console.log('ini:  ' + this.latitudIni + ', ' + this.longitudIni);
    console.log('fin:  ' + this.latitudFin + ', ' + this.longitudFin);
    if (this.latitudFin === null) {
      this.alertService.present('Error', 'Debe buscar zona de destino');
    } else {
      this.navParam.set({
        latitudIni: this.latitudIni,
        longitudIni: this.longitudIni,
        latitudFin: this.latitudFin,
        longitudFin: this.longitudFin,
        pais: this.pais,
        ciudad: this.ciudad
      });
      this.navCtrl.navigateForward('/registro-carrera');
    }
  }

}
