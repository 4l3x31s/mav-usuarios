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
import { promise } from 'protractor';

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
    public platform: Platform,
    public loadingService: LoadingService,
  ) {
    
   }

  ngOnInit() {
    this.loadingService.present();
    this.latitudFin = null;
    /*this.sesionService.crearSesionBase().then(() => {
        this.sesionService.getSesion().then((cliente) => {
            if (cliente) {
              this.cliente = cliente;
            } else {
              this.navCtrl.navigateRoot('/login');
            }
          });
      });*/
      this.posicionamiento();
      this.loadingService.dismiss();
  }
  posicionamiento(){
    navigator.geolocation.getCurrentPosition((resp) => {
      let myLatlng = { lat: resp.coords.latitude, lng: resp.coords.longitude};
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'location': myLatlng}, (results, status) =>{
        if (status === 'OK') {
          console.log('entra a status ok');
          this.processLocation(results);
        }
      })
      this.cargarMapa(myLatlng);
    });
  }
  processLocation(location) {    
    if (location[1]) {
      for (var i = 0; i < location.length; i++) {
        if (location[i].types[0] === "locality") {
          this.ciudad = location[i].address_components[0].short_name;
          this.pais = location[i].address_components[2].long_name;  
          console.log(this.ciudad, this.pais);
        }
      }
    }   
  }
  cargarMapa(latLng){
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
      center: latLng
    };
    this.latitudIni = latLng.lat.toString();
    this.longitudIni = latLng.lng.toString();
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    let marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      draggable: false,
      title: 'Inicio Carrera',
      animation: google.maps.Animation.DROP,
      icon: 'assets/image/pin-check.png'
    });
    setTimeout(()=>{
      let markers = [];  
      this.iniciarBuscador(markers,latLng);
      let respuesta = this.buscarTexto(this.map, markers, this.alertService);
      respuesta.subscribe( markers2 => {
        console.log("ingreso")
        let respuesta = this.markerEvent(markers2);
        respuesta.subscribe(obj => {
          this.latitudFin = obj.lat;
          this.longitudFin = obj.lng;
          console.log(this.latitudFin);
        });
      })
    }, 1500)
  }
  iniciarBuscador(markers,latLng){
    markers = [];
    let input = document.getElementById('pac-input-carrera');
      this.searchBox = new google.maps.places.SearchBox(input);
      this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
      this.map.addListener('bounds_changed', () =>{
        this.searchBox.setBounds(this.map.getBounds());
    });
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];
    markers.push(new google.maps.Marker({
      map: this.map,
      draggable: true,
      title: 'Destino Carrera',
      position: {lat:latLng.lat, lng:latLng.lng+0.001},
      animation: google.maps.Animation.DROP,
      icon: 'assets/image/pin-end.png'
    }));
    markers[0].addListener('dragend', () => {
      console.log(JSON.stringify(markers[0].getPosition()));
      const objStr: string = JSON.stringify(markers[0].getPosition());
      const obj = JSON.parse(objStr);
      this.latitudFin = obj.lat;
      this.longitudFin = obj.lng;
    });
  }
  buscarTexto(map, markers, alertService): Observable<any> {
    return Observable.create((observer) => {
      this.searchBox.addListener('places_changed', () =>{
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
          alertService.present('Alerta', 'Debes escoger una opcion de la lista');
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
